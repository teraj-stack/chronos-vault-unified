# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Authentication & Verification Invariant**: Every read and write operation on `/taskLists/{listId}`, `/tasks/{taskId}`, `/clinicDevices/{deviceId}`, `/clinicTreatments/{treatmentId}`, `/publicProfiles/{profileId}`, `/seoContentAssets/{assetId}`, and `/seoReportSchedules/{scheduleId}` requires an authenticated user (`request.auth != null`) with a verified email (`request.auth.token.email_verified == true`).
2. **Ownership, Team & PII Split-Collection Invariant**:
   - A `TaskList` can only be read (`get`, `list`) by its `ownerId` or a collaborator whose verified email is in `resource.data.memberEmails`.
   - A `TaskItem`, `ClinicDevice`, `ClinicTreatmentPlan`, or `SeoContentAsset` can only be read (`get`, `list`) by its `ownerId` or a collaborator whose verified email is in `resource.data.collaboratorEmails`.
   - `SharedUserProfile` (`/publicProfiles/{profileId}`) follows the **Split Collection PII-Isolation Strategy**: it stores zero PII (no `email`, `phone`, or `address`), `profileId` must equal `request.auth.uid` on write, and `get`/`list` are strictly restricted to `resource.data.ownerId == request.auth.uid || resource.data.isPubliclyShared == true`.
   - `SeoReportSchedule` (`/seoReportSchedules/{scheduleId}`) contains `recipientEmails` (PII) and is strictly restricted on all operations (`get`, `list`, `create`, `update`, `delete`) to `ownerId == request.auth.uid`.
3. **Strict Schema & Volumetric Invariant**:
   - All document IDs must match `^[a-zA-Z0-9_\-]+$` and be `<= 128` chars.
   - All string fields are strictly bounded by `.size()` matching `firebase-blueprint.json`.
   - All array fields (`memberEmails`, `collaboratorEmails`, `recipientEmails`, `keywordHistory`, `tags`, `specialties`) are strictly bounded (`<= 10` or `<= 8`).
4. **Relational Consistency Invariant**:
   - Creating a `ClinicTreatmentPlan` requires `deviceId` to either be a built-in demo unit (`^dev_demo_[a-zA-Z0-9_\-]+$`) or an existing `/clinicDevices/$(incoming().deviceId)` owned by or shared with the caller.
5. **Temporal & Immutability Invariant**:
   - `createdAt` must equal `request.time` on `create` and is immutable on `update`.
   - `updatedAt` must equal `request.time` on `create` and `update`.
   - `ownerId` must equal `request.auth.uid` on `create` and is immutable on `update`.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write**: `auth = null`, creating a task, SEO content asset, or profile -> `PERMISSION_DENIED`.
2. **Unverified Email Spoof**: `auth = { uid: 'u1', token: { email: 'team@corp.com', email_verified: false } }` attempting to read shared list, SEO asset, or public profile -> `PERMISSION_DENIED`.
3. **Identity Spoofing on Create**: `auth.uid = 'u1'`, payload sets `ownerId: 'u2'` or writes `/publicProfiles/u2` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection on Create**: Payload includes extra key `isAdmin: true` or `email: 'leak@corp.com'` in `/publicProfiles/{uid}` -> `PERMISSION_DENIED` via `.keys().hasOnly(...)`.
5. **Shadow Field Injection on Update**: Update modifies `ownerId` or adds `hacked: true` -> `PERMISSION_DENIED` via `affectedKeys().hasOnly(...)`.
6. **ID Poisoning**: Document ID contains slashes/special characters or exceeds 128 chars -> `PERMISSION_DENIED` via `isValidId()`.
7. **Denial of Wallet String Overflow**: `contentExcerpt` has 20,000 characters (limit 3,000) -> `PERMISSION_DENIED`.
8. **Array Overflow**: `keywordHistory` or `recipientEmails` contains 15 items (limit 10) -> `PERMISSION_DENIED`.
9. **Invalid Enum State**: `channel: 'tiktok_unlisted'` or `anomalyType: 'unknown'` on `SeoContentAsset` -> `PERMISSION_DENIED`.
10. **Forged Client Timestamp**: `createdAt` set to a past timestamp instead of `request.time` -> `PERMISSION_DENIED`.
11. **PII Schedule Leak Attempt**: Authenticated user `u2` attempting `get` or `list` on `u1`'s `/seoReportSchedules/{scheduleId}` -> `PERMISSION_DENIED`.
12. **Private Profile Scrape Attempt**: Authenticated user `u2` attempting `get` or `list` on `/publicProfiles/u1` where `isPubliclyShared == false` -> `PERMISSION_DENIED`.
