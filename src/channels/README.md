# Channels

NotifyHub supports exactly two channels, and only these two:

| Channel  | Handler                    | Recipient field   | Template fields                                          | Delivered by                                  |
| -------- | -------------------------- | ----------------- | -------------------------------------------------------- | --------------------------------------------- |
| `email`  | `email/email.channel.ts`   | `to.email`        | `subject` (plain), `html` (HTML-escaped), `text` (plain) | `EMAIL_PROVIDERS` (SMTP, Brevo) with failover |
| `in_app` | `in-app/in-app.channel.ts` | `to.subscriberId` | `title`, `body`, `actionUrl` (all plain)                 | `InboxProvider`: MongoDB + Socket.IO          |

SMS, push, chat apps and other channels are out of scope.

## How a channel is wired

The core (trigger API, queues, worker lifecycle, renderer, provider registry) is
driven by one `ChannelHandler` per channel (`channels.interfaces.ts`), registered
in `channel-handlers.ts`. A handler says:

- which recipient field it needs (`recipientField`)
- which template fields it renders, and how they are escaped (`templateFields`)
- what content is required (`validateContent`)
- how to turn the rendered content into the provider's message (`buildMessage`)

Each channel also has its own BullMQ queue and concurrency setting
(`channels.constants.ts`), request DTO (`events/dto/channels/`) and worker
processor (`worker/processors/`).

## Adding an email provider

See [docs/contributing/adding-a-provider.md](../../docs/contributing/adding-a-provider.md)
(contract, failure kinds, step-by-step example, tests, docs to update).
