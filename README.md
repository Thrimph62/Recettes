# Recettes de famille

Site statique (HTML + Supabase), hébergé sur GitHub Pages. Accès privé : connexion obligatoire.

## Pages

| Fichier | Rôle |
|---|---|
| `login.html` | Connexion (e-mail + mot de passe) |
| `index.html` | Bibliothèque de recettes (recherche, filtres) |
| `recette.html?id=…` | Affichage d'une recette (HTML stocké, dans un iframe isolé) |
| `recipe-parser.html` | Création / édition de recettes, envoi vers Supabase |
| `import-recettes.html` | Import DOCX / PDF via l'API Claude, puis envoi vers Supabase |
| `menu-builder.html` | Menu de la semaine + liste de courses |
| `prep-planner.html` | Planning de préparation |

Fichiers communs : `auth.js` (client Supabase unique `window._sb` + garde de connexion) et `style.css` (reset, navigation, mobile).

## Templates de recette

`template_recette.html` est le modèle unique : on change seulement la classe du `<body>`
(`cat-entree`, `cat-plat`, `cat-viande`, `cat-poisson`, `cat-accompagnement`, `cat-sauce`,
`cat-dessert`, `cat-boissons`, `cat-aperitif`, `cat-divers`) et le texte de `.recipe-category-tag`.
Les palettes sont des variables CSS en tête du fichier. Les `template_recette_*.html` sont les anciens
modèles par catégorie (rendu identique, conservés pour référence).

## Supabase

Tables : `recettes_recettes`, `recettes_menus`, `recettes_listes_courses`.
RLS activé sur chacune, une seule règle (utilisateurs connectés) :

```sql
alter table recettes_recettes enable row level security;
create policy "connectes seulement" on recettes_recettes
  for all to authenticated using (true) with check (true);
```

Inscriptions publiques désactivées (Authentication → Providers → Email). Les comptes se créent depuis le tableau de bord Supabase.
La clé `anon` visible dans `auth.js` est publique par conception : la sécurité repose sur RLS, pas sur le secret de cette clé.

## Déploiement

Pousser sur la branche `main` ; GitHub Pages publie à la racine. Après une mise à jour, Ctrl+F5 pour vider le cache.
