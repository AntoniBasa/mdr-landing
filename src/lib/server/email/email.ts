import "server-only";
import { Resend, type CreateEmailResponse } from "resend";
import { findModelById } from "@/data/models";
import { formatPrice } from "@/data/specs";
import type { DroneModel } from "@/types/models";
import type { PreorderConfirmation } from "@/types/preorder";
import { readOptionalEnvironmentVariable } from "@/lib/server/environment/environment";
import type { ConfirmationEmailContent } from "./types";

const DEFAULT_SENDER: string = "MDR <onboarding@resend.dev>";
const API_KEY_VARIABLE: string = "RESEND_API_KEY";

const getSenderAddress = (): string => {
  const configuredSender: string | undefined = process.env.RESEND_FROM;

  if (configuredSender !== undefined && configuredSender.trim() !== "") {
    return configuredSender.trim();
  }

  return DEFAULT_SENDER;
};

const escapeHtml = (value: string): string => {
  return value.replace(/[&<>"']/g, (character: string): string => {
    return `&#${character.charCodeAt(0)};`;
  });
};

const buildConfirmationEmail = (order: PreorderConfirmation): ConfirmationEmailContent => {
  const model: DroneModel = findModelById(order.model);
  const totalPrice: string = formatPrice(model.specs.priceUsd * order.quantity);
  const subject: string = `Your ${model.name} pre-order is reserved`;

  const text: string = [
    `Hi ${order.name},`,
    "",
    `Thanks for reserving ${order.quantity} × ${model.name} (${totalPrice}).`,
    "You won't be charged until your drone ships — we'll email you before that happens.",
    "",
    `Reference: ${order.id}`,
    "— The MDR team",
  ].join("\n");

  const html: string = `
    <div style="font-family:system-ui,sans-serif;background:#000;color:#fff;padding:32px;border-radius:24px">
      <p style="letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5);font-size:12px;margin:0">MDR pre-order</p>
      <h1 style="font-weight:300;font-size:28px;margin:12px 0 24px">You're on the list, ${escapeHtml(order.name)}.</h1>
      <p style="color:rgba(255,255,255,.7);line-height:1.6">
        Thanks for reserving <strong style="color:#fff">${order.quantity} × ${model.name}</strong>
        (${totalPrice}). You won't be charged until your drone ships — we'll email you before that happens.
      </p>
      <p style="color:rgba(255,255,255,.5);font-size:12px;margin-top:32px">Reference: ${order.id}</p>
    </div>`;

  return { subject, text, html };
};

const sendPreorderConfirmation = async (order: PreorderConfirmation): Promise<void> => {
  const emailContent: ConfirmationEmailContent = buildConfirmationEmail(order);
  const apiKey: string | undefined = readOptionalEnvironmentVariable(API_KEY_VARIABLE);

  if (apiKey === undefined) {
    console.info("[mdr] Confirmation email (not sent):", {
      to: order.email,
      subject: emailContent.subject,
      text: emailContent.text,
    });
    return;
  }

  const resendClient: Resend = new Resend(apiKey);
  const sendResult: CreateEmailResponse = await resendClient.emails.send({
    from: getSenderAddress(),
    to: order.email,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
  });

  if (sendResult.error !== null) {
    console.error("[mdr] Failed to send confirmation email:", sendResult.error);
  }
};

export { sendPreorderConfirmation };
