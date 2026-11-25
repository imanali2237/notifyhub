# Security policy

NotifyHub handles API keys, login credentials and the contents of the
notifications your apps send, so security reports are taken seriously.
Thank you for helping keep NotifyHub and the people who self-host it safe.

## Reporting a vulnerability

**Please do not open a public issue, pull request or discussion for a
security problem.** That would make it public before a fix exists.

Report it privately through GitHub instead:

1. Go to the repository's **Security** tab.
2. Click **Report a vulnerability**.
3. Fill in the form. Only the maintainers can see it.

Please include:

- What the problem is and what an attacker could do with it
- Steps to reproduce (requests, payloads, settings), or a proof of concept
- The version or commit you tested, and whether you used the Docker setup
- Any idea you have for a fix (optional)

## What to expect

NotifyHub is a volunteer-maintained open-source project, so these are
targets, not guarantees:

| Step | Target |
|---|---|
| We confirm we received your report | Within 7 days |
| We tell you whether we can reproduce it, and how serious we think it is | Within 14 days |
| Fix released | As soon as possible; critical issues first |

We'll keep you updated, agree on a disclosure date with you (normally once
a fix is released, and at most 90 days after your report), and credit you
in the release notes and the security advisory unless you prefer to stay
anonymous.

## Supported versions

NotifyHub is in early development (0.x). Security fixes are made on the
`main` branch and included in the next release. Please test against the
latest release or `main` before reporting.

| Version | Supported |
|---|---|
| Latest 0.x release and `main` | ✅ |
| Older releases | ❌ Please update |

## Scope

**In scope**: problems in this repository's code or its default Docker
setup, for example:

- Getting in without valid credentials: bypassing API key, login or
  subscriber-token checks
- Reaching another tenant's data, or another subscriber's inbox
- Forging or reusing inbox subscriber tokens beyond what's intended
- Injection (NoSQL/SQL, template injection, header injection in emails)
- Cross-site scripting through notification content or the inbox
- Leaking secrets: provider credentials, API keys, password hashes, JWTs
- An insecure default in `docker/docker-compose.prod.yml` or the `Dockerfile`

**Out of scope**:

- Attacks that need access the attacker shouldn't have anyway: a shell on
  the server, the `.env` / `.env.production` file, or direct database access
- Setups that ignore the [self-hosting security checklist](docs/self-hosting.md#10-security-checklist)
  (for example running without HTTPS, or with `CORS_ORIGINS=*` in production)
- Problems in third-party services (Gmail, Brevo…); report those to the provider
- Vulnerabilities in dependencies with no demonstrated impact on NotifyHub;
  report those upstream
- Missing rate limiting on login and sending endpoints: a **known gap**,
  planned on the [roadmap](README.md#roadmap). Until then, put a reverse
  proxy with rate limiting in front of the API for internet-facing setups.
- Volumetric denial of service

## Good-faith research

If you make a good-faith effort to follow this policy, only test against
**your own** NotifyHub installation, and avoid harming other people's data
or services, we won't pursue or support legal action against you. Please
never test against a NotifyHub server you don't own.

## For people self-hosting NotifyHub

How to run it securely (HTTPS, firewall, secrets, backups) is covered in the
[self-hosting guide's security checklist](docs/self-hosting.md#10-security-checklist).
Watch the repository's releases (**Watch → Custom → Releases**) so you hear
about security fixes.

Security measures already built in, for reference:

- API keys are stored only as SHA-256 hashes and shown once on creation
- Passwords are hashed with argon2; login takes the same time for unknown emails
- Verification codes expire, are limited to 5 attempts and have a resend cooldown
- Browser inbox access uses short-lived subscriber tokens scoped to one user,
  never an API key
- Notification content in emails is HTML-escaped; inbox links must be
  `http(s)` or relative paths
- Provider credentials live only in the server's `.env`, never in the
  database or API responses
- The production Docker setup keeps databases off the public network,
  requires a Redis password and runs the app as a non-root user
