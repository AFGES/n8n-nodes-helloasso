# @afges/n8n-nodes-helloasso

> Nœud communautaire n8n pour l'API HelloAsso (v5) — billetterie, dons, adhésions et paiements.
> n8n community node for the HelloAsso API (v5) — ticketing, donations, memberships and payments.

[Français](#français) · [English](#english)

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

---

## Français

Nœud communautaire [n8n](https://n8n.io) pour interagir avec l'[API HelloAsso v5](https://dev.helloasso.com).
HelloAsso est la plateforme française de paiement pour les associations (billetterie,
campagnes de dons, adhésions, boutiques). Ce nœud permet d'automatiser la lecture et la
gestion des organisations, formulaires, commandes, paiements, articles et intentions de
paiement directement dans vos workflows n8n.

Base de l'API : `https://api.helloasso.com/v5/`.

### Installation

Suivez le [guide d'installation des nœuds communautaires](https://docs.n8n.io/integrations/community-nodes/installation/)
de n8n.

Dans n8n : **Settings → Community Nodes → Install**, puis saisissez le nom du paquet :

```
@afges/n8n-nodes-helloasso
```

Installation manuelle (instance auto-hébergée) :

```bash
npm install @afges/n8n-nodes-helloasso
```

### Identifiants (Credentials)

Le nœud utilise des identifiants **HelloAsso OAuth2 API** (flux *Client Credentials*).

1. Créez une application API depuis votre espace HelloAsso et récupérez vos clés :
   voir la [documentation HelloAsso](https://dev.helloasso.com/docs/getting-started).
2. Dans n8n, créez des identifiants **HelloAsso OAuth2 API** et renseignez votre
   **Client ID** et votre **Client Secret**.
3. Le reste est préconfiguré :
   - Type d'autorisation : *Client Credentials*
   - URL du jeton : `https://api.helloasso.com/oauth2/token`
   - Authentification dans le corps de la requête (*body*), aucun *scope* requis.

Les identifiants sont validés via un appel à `GET /v5/users/me/organizations`.

### Opérations

| Ressource | Opérations | Description |
|-----------|------------|-------------|
| **Organisation** (Organization) | Get | Récupère une organisation par son *slug*. |
| **Formulaire** (Form) | Get Many · Get Public Data | Liste les formulaires (filtres : types, états ; pagination) ; récupère les données publiques d'un formulaire. |
| **Commande** (Order) | Get · Get Many · Cancel | Récupère, liste (filtres : types de formulaire, plage de dates, recherche, détails) ou annule une commande. |
| **Paiement** (Payment) | Get · Get Many · Refund | Récupère, liste (filtres : états, plage de dates, recherche) ou rembourse un paiement (total/partiel). |
| **Article** (Item) | Get · Get Many | Récupère ou liste les articles de commande. |
| **Intention de paiement** (Checkout Intent) | Create · Get | Crée une intention de paiement (montants en centimes, URLs de retour/erreur/abandon, métadonnées) et renvoie l'URL de redirection ; récupère une intention. |

### Fonctionnalités

- **Sélecteur d'organisation** : choisissez dans une liste déroulante de vos organisations
  (chargée automatiquement) ou saisissez manuellement le *slug*
  (ex. : `helloasso.com/associations/<slug>`).
- **Pagination** : option *Return All* pour tout récupérer, ou *Limit* pour borner le
  nombre de résultats (pagination par *continuation token* de l'API v5).
- **Filtres avancés** : plages de dates, recherche texte (nom/email du payeur), types de
  formulaire, états de paiement.
- Le nœud est utilisable comme **outil** (`usableAsTool`) dans les workflows IA d'n8n.

### Compatibilité

- API des nœuds n8n version 1, mode `strict`.
- Nécessite une instance n8n prenant en charge les nœuds communautaires.

### Exemple d'utilisation

1. Ajoutez le nœud **HelloAsso** et sélectionnez vos identifiants.
2. Ressource **Order** (Commande) → opération **Get Many**.
3. Choisissez votre **Organisation** dans la liste déroulante.
4. Ajoutez un filtre *From Date* / *To Date* pour ne récupérer que les commandes d'une
   période donnée.

### Ressources

- [Documentation des nœuds communautaires n8n](https://docs.n8n.io/integrations/community-nodes/)
- [Documentation de l'API HelloAsso](https://dev.helloasso.com/docs/getting-started)
- [Dépôt GitHub](https://github.com/AFGES/n8n-nodes-helloasso)

### Historique des versions

Voir [CHANGELOG.md](CHANGELOG.md). Version actuelle : **0.0.5**.

### Licence

[MIT](https://opensource.org/licenses/MIT).

---

## English

[n8n](https://n8n.io) community node for the [HelloAsso v5 API](https://dev.helloasso.com).
HelloAsso is the French payment platform for nonprofits (ticketing, donation campaigns,
memberships, shops). This node lets you automate reading and managing organizations, forms,
orders, payments, items and checkout intents directly inside your n8n workflows.

API base: `https://api.helloasso.com/v5/`.

### Installation

Follow n8n's [community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

In n8n: **Settings → Community Nodes → Install**, then enter the package name:

```
@afges/n8n-nodes-helloasso
```

Manual install (self-hosted instance):

```bash
npm install @afges/n8n-nodes-helloasso
```

### Credentials

The node uses **HelloAsso OAuth2 API** credentials (*Client Credentials* flow).

1. Create an API application from your HelloAsso account and get your keys:
   see the [HelloAsso documentation](https://dev.helloasso.com/docs/getting-started).
2. In n8n, create **HelloAsso OAuth2 API** credentials and fill in your
   **Client ID** and **Client Secret**.
3. Everything else is preconfigured:
   - Grant type: *Client Credentials*
   - Token URL: `https://api.helloasso.com/oauth2/token`
   - Body authentication, no scopes required.

Credentials are validated with a call to `GET /v5/users/me/organizations`.

### Operations

| Resource | Operations | Description |
|----------|------------|-------------|
| **Organization** | Get | Get an organization by its slug. |
| **Form** | Get Many · Get Public Data | List forms (filters: types, states; pagination); get the public data of a form. |
| **Order** | Get · Get Many · Cancel | Get, list (filters: form types, date range, search, with details) or cancel an order. |
| **Payment** | Get · Get Many · Refund | Get, list (filters: states, date range, search) or refund a payment (full/partial). |
| **Item** | Get · Get Many | Get or list order items. |
| **Checkout Intent** | Create · Get | Create a checkout intent (amounts in cents, return/error/back URLs, metadata) and get its redirect URL; get an intent. |

### Features

- **Organization picker**: pick from a dropdown of your organizations (loaded
  automatically) or enter the slug manually
  (e.g. `helloasso.com/associations/<slug>`).
- **Pagination**: *Return All* to fetch everything, or *Limit* to cap the number of
  results (v5 API continuation-token pagination).
- **Advanced filters**: date ranges, text search (payer name/email), form types,
  payment states.
- The node is **usable as a tool** (`usableAsTool`) in n8n AI workflows.

### Compatibility

- n8n nodes API version 1, `strict` mode.
- Requires an n8n instance that supports community nodes.

### Usage example

1. Add the **HelloAsso** node and select your credentials.
2. Resource **Order** → operation **Get Many**.
3. Choose your **Organization** from the dropdown.
4. Add a *From Date* / *To Date* filter to fetch only the orders of a given period.

### Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [HelloAsso API documentation](https://dev.helloasso.com/docs/getting-started)
- [GitHub repository](https://github.com/AFGES/n8n-nodes-helloasso)

### Version history

See [CHANGELOG.md](CHANGELOG.md). Current version: **0.0.5**.

### License

[MIT](https://opensource.org/licenses/MIT).
