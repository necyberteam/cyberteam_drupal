# OpenID Connect CILogon Client

This module provides CILogon authentication clients for the OpenID Connect module, enabling authentication via CILogon for 2500+ academic institutions.

## Features

- **Two login options:**
  - **Generic CILogon**: Allows users to select from any supported institution
  - **ACCESS CI**: Pre-configured for ACCESS CI identity provider
  
- **Flexible configuration**: Customizable endpoints, scopes, and IdP hints
- **Identity provider tracking**: Stores the user's identity provider name
- **Secure authentication**: Usernames based on stable `sub` claim
- **Migration support**: Migrates from abandoned cilogon_auth module

## Requirements

- Drupal 9.4+ or Drupal 10+ or Drupal 11+
- OpenID Connect module (drupal/openid_connect)

## Installation

1. Install via Composer:
   ```bash
   composer require drupal/openid_connect
   ```

2. Enable the modules:
   ```bash
   drush en openid_connect openid_connect_cilogon_client -y
   ```

3. Configure your CILogon client(s) at:
   - `/admin/config/services/openid-connect`

## Configuration

### CILogon Client Registration

Before using this module, register your application with CILogon:

1. Visit https://cilogon.org/oauth2/register
2. Set the callback URL to: `https://yoursite.com/openid-connect/cilogon`
3. Note your Client ID and Client Secret

### Module Configuration

1. Navigate to **Configuration > Web Services > OpenID Connect**
2. Enable and configure the CILogon client(s):
   - **Client ID**: From your CILogon registration
   - **Client Secret**: From your CILogon registration
   - **Authorization endpoint**: `https://cilogon.org/authorize`
   - **Token endpoint**: `https://cilogon.org/oauth2/token`
   - **UserInfo endpoint**: `https://cilogon.org/oauth2/userinfo`
   - **IdP hint**: (optional) Pre-select an institution

### Login Blocks

The module automatically creates login blocks:
- **Login with your institution** (cilogon)
- **Login with ACCESS CI** (cilogon_accessci)

Place these blocks in your theme's block layout as needed.

## Usage

### Generic Institution Login

For sites that should support any CILogon institution:
1. Enable the "cilogon" client
2. Place the "Login with your institution" block
3. Users will see an institution selector

### ACCESS CI Login

For ACCESS-specific sites:
1. Enable the "cilogon_accessci" client
2. Place the "Login with ACCESS CI" block
3. Users will be directed to ACCESS CI IdP
4. Optionally enable "Require ACCESS CI identity" validation

## Migration from cilogon_auth

If you're migrating from the cilogon_auth module:

1. Install this module (do not uninstall cilogon_auth yet)
2. Run the migration update hook:
   ```bash
   drush updb
   ```
3. Verify user authentication still works
4. Uninstall cilogon_auth module

## Technical Details

### Username Generation

Usernames are set to the `sub` claim from CILogon (e.g., `user@access-ci.org` or `http://cilogon.org/serverA/users/12345`). This ensures:
- Stable identifiers (never change even if email changes)
- Unique per user
- Compatible with authmap-based login matching

### Identity Provider Storage

When enabled, the module stores the identity provider name in a user field (`field_cilogon_idp`). This allows:
- Tracking which institution users belong to
- Reporting and analytics
- Conditional access based on institution

## Troubleshooting

### Users can't log in after migration

Verify the authmap was migrated correctly:
```sql
SELECT * FROM openid_connect_authmap WHERE client_name = 'cilogon';
```

### Wrong callback URL

Ensure your CILogon registration uses:
- Old: `https://example.com/cilogon-auth/cilogon`
- New: `https://example.com/openid-connect/cilogon`

## Support

For issues, please use the project issue queue:
https://github.com/access-ci-org/openid_connect_cilogon_client/issues

## License

GPL-2.0-or-later
