# Security Vulnerabilities & Issues

Generated: 2026-05-13

---

## CRITICAL

### 1. Hardcoded API Key in Source Code
- **Files:** `src/environments/environment.ts`, `src/environments/environment.prod.ts`
- **Detail:** `apiKey: "REDACTED_API_KEY"` is hardcoded in both environment files and sent as a plain HTTP header (`ApiKey`) on every request. The same key is used in both development and production. Anyone with DevTools access can steal it.
- **Fix:** Move to server-side proxying. At minimum, use separate keys per environment and restrict by IP/domain. Never commit secrets to source control.

### 2. Hardcoded Google Maps API Key in index.html
- **File:** `src/index.html`
- **Detail:** `REDACTED_GOOGLE_MAPS_KEY` is embedded directly in the HTML, visible to anyone who views page source.
- **Fix:** Restrict the key to your production domain in Google Cloud Console. Move the key value into the environment config and inject it at build time via `@angular/google-maps`.

### 3. XSS via Unsanitized innerHTML Binding
- **File:** `src/app/generic-components/activity-log/activity-log.component.html`
- **Detail:** `[innerHTML]="activityLog.log"` binds a server-provided value directly to innerHTML. If the backend ever serves user-generated content in this field, it is a stored XSS vector that executes arbitrary JavaScript in the user's browser.
- **Fix:** Remove the innerHTML binding and render the value as plain text, or pass it through Angular's `DomSanitizer.sanitize(SecurityContext.HTML, value)` before binding.

### 4. bypassSecurityTrustResourceUrl Without Validation
- **File:** `src/app/property-components/property-images/property-images.component.ts`
- **Detail:** `sanitizer.bypassSecurityTrustResourceUrl()` is called to construct YouTube embed URLs from a `videoUrl` value. If `videoUrl` originates from user input or an unvalidated API response, an attacker can inject a malicious iframe source.
- **Fix:** Validate `videoUrl` against a strict allowlist (`/^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/`) before calling `bypassSecurityTrustResourceUrl`.

---

## HIGH

### 5. No HttpInterceptor — Auth Headers Duplicated Everywhere
- **Files:** All components and API services (29 services)
- **Detail:** Every component manually calls `authenticationService.refreshHttpOptions()` before each HTTP request to attach auth headers. There is no central interceptor to handle 401 responses, token refresh, or logout on session expiry.
- **Fix:** Implement an `HttpInterceptor` that attaches auth headers to every outgoing request and redirects to login on 401 responses.

### 6. No Content Security Policy
- **Files:** `src/index.html`, server configuration
- **Detail:** No CSP headers or meta tags are configured. This significantly reduces the browser's ability to block XSS attacks even if one is injected.
- **Fix:** Add a `Content-Security-Policy` header at the server level (or a meta tag) restricting `script-src`, `frame-src`, `img-src`, and `connect-src` to known safe origins.

### 7. Memory Leaks — RxJS Subscriptions Never Unsubscribed
- **Files:** Most component files across the codebase
- **Detail:** Only 4 components implement `OnDestroy`. All other components subscribe to observables without ever unsubscribing, causing memory leaks that accumulate as the user navigates between routes.
- **Fix:** Add a `destroy$ = new Subject<void>()` to each component, pipe subscriptions through `.pipe(takeUntil(this.destroy$))`, and call `this.destroy$.next(); this.destroy$.complete()` in `ngOnDestroy`. Alternatively, use the `async` pipe in templates.

### 8. 358 console.log Calls in Production Code
- **Files:** Throughout the entire codebase
- **Detail:** Debug logging statements leak internal data structures, API responses, user emails, and tokens to anyone with browser DevTools open.
- **Fix:** Remove all `console.log` statements from production paths. If logging is needed, use a structured logger service with log levels that is disabled in production builds.

### 9. Auth0 Application Not Restricted to Production Domain
- **File:** `src/app/app.module.ts`
- **Detail:** Auth0 is configured with `domain: 'REDACTED_AUTH0_DOMAIN'` and `clientId: 'REDACTED_AUTH0_CLIENT_ID'`. If the Auth0 application settings do not strictly restrict allowed callback URLs and logout URLs to the production domain, the token flow could be abused via open redirect.
- **Fix:** In the Auth0 dashboard, lock down Allowed Callback URLs, Allowed Logout URLs, and Allowed Web Origins to the exact production URL only.

---

## MEDIUM

### 10. Weak Input Validation
- **File:** `src/app/services/validation.service.ts`
- **Detail:** `ValidationService` only checks for null/empty strings. There is no regex validation for email addresses, phone numbers, URLs, or ZIP codes. No inputs are sanitized before being displayed back to the user.
- **Fix:** Add format validation (regex) for all structured fields. Sanitize any value that will be rendered back to the DOM.

### 11. Hardcoded Mapbox Token in Environment Files
- **Files:** `src/environments/environment.ts`, `src/environments/environment.prod.ts`
- **Detail:** The Mapbox public access token `REDACTED_MAPBOX_TOKEN` is committed to source. The same token is used in both environments.
- **Fix:** Restrict the token in the Mapbox dashboard to your production domain/URL. Use separate tokens per environment.

### 12. Same API Key Across All Environments
- **Files:** `src/environments/environment.ts`, `src/environments/environment.prod.ts`
- **Detail:** The `apiKey` value is identical in both environment files. If the development key is compromised or exposed, it also compromises the production API.
- **Fix:** Use separate API keys per environment. Rotate keys immediately if any have been exposed.

### 13. Inconsistent Error Handling Across API Services
- **Files:** Multiple files in `src/app/api-service/`
- **Detail:** Some API services define an `errorHandl()` method but do not attach it to `.pipe(catchError())` on all methods (e.g., `QueriesPropertyService`). Other services have no error handling at all. This means errors are silently swallowed in many call paths.
- **Fix:** Audit all 29 API services. Ensure every HTTP call has `.pipe(catchError())`. Centralize error handling in the `HttpInterceptor`.

### 14. No Global Error Handler
- **File:** `src/app/app.module.ts`
- **Detail:** Angular's `ErrorHandler` is not overridden. Unhandled errors in components (outside RxJS streams) are logged to the console only and not captured or reported anywhere.
- **Fix:** Implement a custom `ErrorHandler` provider that logs errors to a monitoring service (e.g., Sentry) and shows a user-friendly message.

### 15. CDN Dependencies Without Subresource Integrity (SRI)
- **File:** `src/index.html`
- **Detail:** Bootstrap CSS, Font Awesome, jQuery, and other libraries are loaded from external CDNs without `integrity` and `crossorigin` attributes. If the CDN is compromised, malicious scripts could be injected.
- **Fix:** Add SRI hashes (`integrity="sha384-..."`) to all external `<script>` and `<link>` tags. Better yet, bundle these dependencies via npm so they are part of the build.

---

## LOW

### 16. 155+ Uses of TypeScript `any` Type
- **Files:** Throughout the codebase, despite `strict: true` in `tsconfig.json`
- **Detail:** Widespread use of `any` bypasses TypeScript's type checker, hiding potential type errors and making the codebase harder to maintain safely.
- **Fix:** Replace `any` with the appropriate model interfaces already defined in `src/app/structures/` and `src/app/models/`.

### 17. Manual JSON.stringify in API Services
- **Files:** All API service files in `src/app/api-service/`
- **Detail:** Every POST/PUT call manually calls `JSON.stringify(data)` before passing the body to `HttpClient`. Angular's `HttpClient` serializes plain objects automatically when `Content-Type: application/json` is set, making this redundant and a potential source of double-encoding bugs.
- **Fix:** Remove all manual `JSON.stringify()` calls and pass plain objects directly to `HttpClient` methods.

### 18. jQuery Loaded as Global Dependency
- **File:** `src/index.html`, `package.json`
- **Detail:** jQuery is loaded via CDN and used by legacy Angular libraries (`angular-ui-sortable`). jQuery is unnecessary in Angular and increases the attack surface.
- **Fix:** Replace `angular-ui-sortable` with `@angular/cdk/drag-drop`. Remove jQuery.

### 19. CKEditor 4 (End of Life)
- **File:** `package.json` (`ckeditor4-angular`)
- **Detail:** CKEditor 4 reached end of life and no longer receives security patches.
- **Fix:** Migrate to `@ckeditor/ckeditor5-angular`.

### 20. No CSRF Protection Observed
- **Detail:** The app uses custom headers for authentication (not cookies), which avoids the classic CSRF vector. However, if the backend ever transitions to cookie-based sessions, no CSRF protection is in place on the frontend.
- **Fix:** Document the current security model. If cookies are ever used, implement the `X-XSRF-TOKEN` pattern with Angular's built-in CSRF support.
