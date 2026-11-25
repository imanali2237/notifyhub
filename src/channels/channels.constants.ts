/**
 * The channels NotifyHub supports: email and the in-app inbox, and only these
 * two (see channels/README.md).
 */
export const CHANNELS = ['email', 'in_app'] as const;

export type Channel = (typeof CHANNELS)[number];

/**
 * One BullMQ queue per channel, so a slow email provider never delays in-app messages,
 * and each channel can get its own concurrency and retry settings.
 */
export const CHANNEL_QUEUES: Record<Channel, string> = {
  email: 'notifications.email',
  in_app: 'notifications.in_app',
};

/**
 * Which .env setting holds each channel's worker concurrency
 * (jobs one worker process runs in parallel). Defaults: config.defaults.ts.
 */
export const CHANNEL_CONCURRENCY_SETTING = {
  email: 'EMAIL_WORKER_CONCURRENCY',
  in_app: 'IN_APP_WORKER_CONCURRENCY',
} as const satisfies Record<Channel, string>;
