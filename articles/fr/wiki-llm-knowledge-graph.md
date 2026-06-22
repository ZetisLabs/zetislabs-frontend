---
title: "Le wiki piloté par IA : la méthode pour travailler avec les LLM sans perdre le fil"
excerpt: "Andrej Karpathy a remis au goût du jour une idée simple : laisser un LLM construire et maintenir votre base de connaissances, un wiki de fiches markdown reliées entre elles. Voici la méthode, sa différence concrète avec un RAG classique, et comment je l'applique au quotidien chez ZetisLabs."
category: "AI & Automation"
author:
  name: "Lucien Fernandez"
  avatar: "LF"
date: "2026-06-10"
readTime: "7 min"
featured: false
---

# Le wiki piloté par IA : la méthode pour travailler avec les LLM sans perdre le fil

Il y a quelque temps, j'ai publié un post LinkedIn sur ma façon de travailler avec les modèles de langage. Le déclencheur : un [gist d'Andrej Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) qui décrit un pattern tout simple, **laisser un LLM construire et maintenir un wiki personnel**, une collection de fiches markdown reliées entre elles. Cet article détaille la méthode, ce qu'elle change vraiment, et comment je l'utilise tous les jours.

Précision utile d'emblée : je ne théorise pas. Ce site, nos notes internes, notre base marketing, tout tourne sur cette méthode. L'exemple que je donne plus bas n'est pas un schéma de présentation, c'est mon vrai workflow.

## C'est quoi un wiki piloté par IA ?

[Andrej Karpathy](https://fr.wikipedia.org/wiki/Andrej_Karpathy), cofondateur d'OpenAI, ancien directeur de l'IA chez Tesla, et la personne qui a popularisé l'expression « vibe coding », décrit dans son gist « LLM Wiki » une architecture en **trois couches** :

1. **Les sources brutes** (jamais modifiées) : les articles, papiers, notes que vous, humain, choisissez d'ingérer.
2. **Le wiki** (maintenu par l'IA) : des fiches markdown (résumés, pages d'entités, pages de concepts) reliées par des liens internes.
3. **Le schéma** (un fichier de configuration, par exemple `CLAUDE.md`) : les règles qui disent à l'IA comment structurer et entretenir le wiki.

Trois opérations font tourner le système :

| Opération  | Ce que fait l'IA                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Ingest** | Lire une nouvelle source, en extraire les idées clés, créer/mettre à jour les fiches concernées et **recâbler les liens** |
| **Query**  | Répondre à une question en cherchant _dans le wiki_ (pas dans les sources brutes), en citant ses fiches                   |
| **Lint**   | Repérer les contradictions, les fiches orphelines, les liens cassés, les affirmations périmées                            |

L'idée derrière le mot savant « [knowledge graph](https://en.wikipedia.org/wiki/Knowledge_graph) » (graphe de connaissances) est ancienne : c'est le bon vieux _second brain_, le réseau de notes reliées que les adeptes de la prise de notes connaissent depuis des années.

## Pourquoi c'est différent maintenant ?

Parce que la principale friction de la méthode vient de disparaître.

Construire un second brain à la main, tout le monde s'y est cassé les dents sur le **même mur** : maintenir les connexions entre les notions à jour et cohérentes. Chaque nouvelle note oblige à relire les anciennes, à recâbler les liens, à corriger ce qui se contredit. C'est un travail d'archiviste, fastidieux, et c'est précisément là que la plupart des systèmes meurent.

Quand vous travaillez avec un LLM, ce n'est plus seulement lui qui **rédige** vos fiches : c'est aussi lui qui **crée et maintient les liens**. La corvée d'entretien, celle qui tuait la méthode, passe à la machine. La connaissance se **compose dans le temps** au lieu d'être reconstruite à chaque question.

## Si c'est l'IA qui écrit mes fiches, est-ce que j'apprends encore ?

C'est l'objection légitime, et la réponse est : oui, _si_ vous ne vous arrêtez pas à la rédaction.

Une fiche écrite par l'IA et jamais relue ne vous apprend rien. Mais le bon usage est différent : vous **lisez** les fiches, vous **posez des questions**, vous soulevez vos doutes, et l'IA met les fiches à jour en fonction de vos retours. Au fil des allers-retours, vous obtenez une base de connaissances **ultra-personnalisée**, et surtout vous avez fait le travail intellectuel de la confronter à votre compréhension.

Bonus qui change tout sur la durée : au fur et à mesure que le projet avance, **l'IA sait ce que vous maîtrisez**, le pourquoi du comment, sans que vous ayez à le lui rappeler à chaque conversation. Si vous codez, vous listez une fois les technologies et les conventions que vous voulez utiliser, et l'IA les réutilise. Vous gardez la connaissance de votre projet _au lieu de la réexpliquer en boucle_.

## Wiki ou RAG : quelle différence concrète ?

Si vous connaissez un peu le sujet, vous allez me dire que c'est un [RAG](https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9ration_%C3%A0_enrichissement_contextuel) (génération augmentée par récupération). Pas tout à fait, et la nuance est l'essentiel de la méthode.

- **Un RAG** récupère, à chaque requête, les **bouts de documents bruts les plus proches** de votre question (par similarité sémantique) et les injecte dans le contexte. Il n'y a pas de mémoire structurée : on repart des morceaux à chaque fois.
- **Un wiki / knowledge graph** part d'une connaissance **déjà compilée et reliée**. L'IA ne se contente pas d'attraper le passage le plus proche : elle peut **suivre les liens explicites** entre les fiches et remonter tout le voisinage pertinent d'une notion.

La différence en une phrase : le RAG retrouve des fragments, le wiki **mobilise un réseau de sens déjà construit**.

Il y a une limite honnête : au-delà d'un certain nombre de fiches, l'IA peut se perdre. Mais pour une solution **rapide à mettre en place et sans complexité**, je ne connais pas mieux. Et pour pousser plus loin, on combine les deux : un **GraphRAG** utilise le RAG pour absorber un grand volume de fiches _et_ le knowledge graph pour les relier, le meilleur des deux mondes.

## Comment lire et éditer son wiki simplement ?

Le wiki n'est qu'un dossier de fichiers markdown : vous pouvez l'ouvrir avec n'importe quoi. Le plus confortable est de poser un vault [Obsidian](https://obsidian.md/) par-dessus. Vous lisez et éditez vos fiches comme un site relié, et le [Web Clipper](https://obsidian.md/clipper) vous permet de capturer une source en un clic pour l'ingérer ensuite.

Mon workflow concret, pour le rendre tangible :

1. Je crée **un wiki par projet**, dans un dépôt GitHub.
2. Je le lie en **sous-module Git** au dépôt du projet concerné : la connaissance vit à côté du code.
3. Je le clone aussi dans un **vault Obsidian** : j'ai la plupart de mes notions accessibles partout, en quelques commandes.

J'ai publié un dépôt qui explique toute la méthode et fournit des _skills_ pour simplifier la gestion (ingest, lint…) : **[github.com/lucienfer/wikis](https://github.com/lucienfer/wikis)**.

## En résumé

- **Le pattern** (Karpathy) : un LLM construit et maintient un wiki de fiches markdown reliées, en trois couches (sources brutes / wiki / schéma) et trois opérations (ingest, query, lint).
- **Ce qui change** : la friction historique du _second brain_, maintenir les liens à jour, passe à la machine. La connaissance se compose au lieu de se reconstruire.
- **Vous apprenez quand même**, à condition de lire les fiches et de challenger l'IA. Vous gagnez en prime une base personnalisée et une IA qui connaît votre projet.
- **Wiki ≠ RAG** : le RAG retrouve des fragments, le wiki suit un réseau de liens déjà construit ; le GraphRAG combine les deux.
- **Outils** : markdown + GitHub (sous-module) + Obsidian par-dessus pour lire/éditer.

Bien utiliser l'IA aujourd'hui, c'est éviter de perdre le fil. Cette méthode est peu coûteuse à mettre en place, et elle optimise à la fois votre apprentissage et votre mise en pratique.

---

Chez **ZetisLabs**, c'est exactement ce type de système que nous construisons pour les entreprises : des outils IA qui s'appuient sur **votre** corpus (vos documents, vos notes, votre vocabulaire) plutôt que sur le web, en paiement unique, et dont vous restez propriétaire. Si vous voulez voir ce qu'un wiki ou un assistant taillé sur vos connaissances pourrait vous faire gagner, [réservez un échange de 30 minutes](https://calendly.com/lucien-zetislabs/30min). C'est une conversation, pas un argumentaire.

## Sources

- Andrej Karpathy, _LLM Wiki_ : [gist.github.com/karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (pattern des 3 couches et des opérations ingest/query/lint)
- _Andrej Karpathy_ : [Wikipédia](https://fr.wikipedia.org/wiki/Andrej_Karpathy)
- _Knowledge graph_ : [Wikipedia (EN)](https://en.wikipedia.org/wiki/Knowledge_graph)
- _Génération augmentée par récupération (RAG)_ : [Wikipédia (FR)](https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9ration_%C3%A0_enrichissement_contextuel)
- Obsidian : [obsidian.md](https://obsidian.md/) · Web Clipper : [obsidian.md/clipper](https://obsidian.md/clipper)
- Dépôt de la méthode (skills inclus) : [github.com/lucienfer/wikis](https://github.com/lucienfer/wikis)
