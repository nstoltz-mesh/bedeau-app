import { useState, useMemo, useEffect, useRef } from "react";

const VINS = [{"id":"V001","n":"Cidre de Glace, Choinière, Québec, 2021 (375 ml)","nom":"Cidre de Glace","c":"Vins Moelleux","p":"Québec","cp":"Cidre de pomme de verger et sauvage","pr":"Suave, gourmand, équilibré ; pomme blette, caramel, beurre, épices","ps":"Un cidre de glace québécois de Frelighsburg : pomme blette, caramel et beurre — la douceur du terroir local.","ca":0,"al":0},{"id":"V002","n":"Sauternes, Essences et Substances, Rousset-Peyraguey, 2004 (500 ml)","nom":"Sauternes","c":"Vins Moelleux","p":"France","cp":"Sémillon, Sauvignon Blanc, Muscadelle","pr":"Umami, décadent, visqueux ; griotte, figue séchée, noix, abricot, torréfié","ps":"Un Sauternes disruptif, voisin d'Yquem : umami et décadent, élevé sous voile en fût d'acacia de 100 ans.","ca":0,"al":0},{"id":"V003","n":"Coteaux du Layon Saint-Aubin, Domaine Cady, Loire, 2022","nom":"Coteaux du Layon Saint-Aubin","c":"Vins Moelleux","p":"France","cp":"100% Chenin Blanc","pr":"Vif, harmonieux, frais ; fruit à chair jaune, agrume, longue finale moelleuse","ps":"Un Layon biologique en 3 tries : vif et frais sur le fruit jaune et les agrumes, avec une finale moelleuse.","ca":0,"al":0},{"id":"V004","n":"À l'Aube, Domaine de la Tournelle, Jura, 2009 (375 ml)","nom":"À l'Aube","c":"Vins Moelleux","p":"France","cp":"100% Savagnin","pr":"Complexe, élégant, profond, onctueux ; fruit confit, miel d'acacia, marmelade d'orange","ps":"Un liquoreux du Jura fermenté 12 ans avec ses levures : complexe, profond et onctueux sur le miel d'acacia.","ca":0,"al":0},{"id":"V005","n":"Pantelleria, Passito Liquoroso, Carlo Pellegrino, Sicile, 2021","nom":"Pantelleria","c":"Vins Moelleux","p":"Italie","cp":"100% Zibibbo (Muscat d'Alexandrie)","pr":"Chaleureux, souple, délicat ; fruit confit, agrume fraîche, vanille","ps":"Un Passito sicilien de l'île volcanique de Pantelleria : chaleureux et délicat, fruit confit, agrume fraîche et vanille.","ca":0,"al":0},{"id":"V006","n":"Vin Santo del Chianti, Renzo Masi, Toscane, 2012","nom":"Vin Santo del Chianti","c":"Vins Moelleux","p":"Italie","cp":"Trebbiano, Chardonnay, Malvasia","pr":"Intense, complexe, persistant ; fruit séché, pelure d'orange, vanille, encens","ps":"Un Vin Santo de Rufina élevé 4 ans : intense et complexe sur le fruit séché, l'orange et l'encens.","ca":0,"al":1},{"id":"V007","n":"Porto LBV, Quinta do Javali, Douro, 2019","nom":"Porto LBV","c":"Vins Moelleux","p":"Portugal","cp":"Tinta Roriz, Touriga Franca, Touriga Nacional, Tinta Cão, Sousão","pr":"Marquant, généreux ; fruit noir confituré, prune, figue, balsamique","ps":"Un Porto LBV millésimé marquant et généreux : fruit noir confituré, prune, figue et balsamique.","ca":0,"al":0},{"id":"V008","n":"Riesling Auslese, Carl Koch, Rheinhessen, 1993","nom":"Riesling Auslese","c":"Vins Moelleux","p":"Allemagne","cp":"100% Riesling","pr":"Intense, expressif, raffiné ; fruit exotique, papaye, roche mouillée, un peu de pétrol","ps":"Un Riesling Auslese de 1993 : intense et raffiné sur la papaye, la roche mouillée et une touche pétrolée.","ca":0,"al":0},{"id":"V009","n":"Rayon, Joy Hill, Québec, 2024","nom":"Rayon","c":"Vins Rosés","p":"Québec","cp":"71% Blaufränkisch, 29% Grüner Veltliner","pr":"Parfumé, fruité, soyeux ; framboises et herbes","ps":"Un rosé québécois de vinifera sur les Appalaches : parfumé, soyeux, framboises et herbes.","ca":0,"al":0},{"id":"V010","n":"Sancerre, Domaine Millérioux, Loire, 2025","nom":"Sancerre rosé","c":"Vins Rosés","p":"France","cp":"100% Pinot Noir","pr":"Frais, structuré, élégant ; petit fruit rouge","ps":"Un Sancerre rosé 2025 sur Pinot Noir : frais, structuré et élégant sur le petit fruit rouge.","ca":0,"al":0},{"id":"V011","n":"Albia, Ricasoli, Toscane, 2023","nom":"Albia","c":"Vins Rosés","p":"Italie","cp":"Sangiovese, Merlot","pr":"Fruité, frais, versatile ; fraise, abricot, lavande","ps":"Un rosé toscan du plus vieux domaine du Chianti (1141) : frais et versatile, fraise, abricot et lavande.","ca":0,"al":0},{"id":"V012","n":"Bobal Rosado, Parajes Del Valle, Manchuelo, 2024","nom":"Bobal Rosado","c":"Vins Rosés","p":"Espagne","cp":"100% Bobal","pr":"Pur, balancé, gouleyant ; fruit rouge, prune, herbes sauvages, longue finale","ps":"Un rosé de Bobal bio pressé direct : pur, gouleyant sur le fruit rouge, la prune et les herbes sauvages.","ca":0,"al":0},{"id":"V013","n":"Comfortably Numb, Fruita Analogica, Catalogne, 2022","nom":"Comfortably Numb","c":"Vins Rosés","p":"Espagne","cp":"Grenache Blanc, Grenache Gris, Grenache Noir","pr":"Léger, désaltérant, facile à boire ; cerise synthétique","ps":"Un rosé-orange catalan léger et désaltérant : direct, sur la cerise — l'apéro sans prise de tête.","ca":0,"al":0},{"id":"V014","n":"Doolittle, Vinyes Tortuga, Catalogne, 2021","nom":"Doolittle","c":"Vins Rosés","p":"Espagne","cp":"100% Barbera","pr":"Fruité, riche, profond, minéral ; fruit bleu","ps":"Un rosé catalan de Barbera élevé 1 an sans ouillage : fruité et profond sur le fruit bleu.","ca":0,"al":0},{"id":"V015","n":"Nice Guy, Max Dexheimer, Reinhessen, 2021","nom":"Nice Guy","c":"Vins Rosés","p":"Allemagne","cp":"Sylvaner, Blauer Portugieser, Pinot Gris, Pinot Blanc","pr":"Vif, croquant, juteux, funky ; fruit rouge, floralité, longueur crayeuse","ps":"Un rosé allemand biodynamique funky et croquant : fruit rouge, floral et longueur crayeuse.","ca":0,"al":0},{"id":"V016","n":"Cavalier Seul, Domaine Gélinas, Québec, 2023","nom":"Cavalier Seul","c":"Vins Oranges","p":"Québec","cp":"Frontenac Blanc, Frontenac Gris","pr":"Fruité, sec, herbacé ; fruit exotique, ananas, légère amertume en fin de bouche","ps":"Un orange québécois hybride : fruité et sec sur le fruit exotique et l'ananas, amertume finale.","ca":0,"al":0},{"id":"V020","n":"Salina, Occhio di Terra, Caravaglio, Sicile, 2021","nom":"Salina","c":"Vins Oranges","p":"Italie","cp":"100% Malvasia di Lipari","pr":"Aromatique, délicat ; pelure d'orange, abricot séché, herbes méditerranéennes, finale très saline","ps":"Un orange sicilien des îles Éoliennes : aromatique et délicat, pelure d'orange, abricot séché et finale saline.","ca":0,"al":0},{"id":"V021","n":"Ribolla, Radikon, Oslavia, 2019 (500 mL)","nom":"Ribolla","c":"Vins Oranges","p":"Italie","cp":"100% Ribolla","pr":"Intense, complexe, ferme, crémeux ; fruit à noyau, orange confite, longue finale épicée","ps":"Un orange de Radikon, référence absolue du genre : intense et complexe, orange confite, élevé 3 ans en fût slovaque.","ca":0,"al":0},{"id":"V022","n":"Rebula, David Bratoz, Vipava, 2020","nom":"Rebula","c":"Vins Oranges","p":"Slovénie","cp":"100% Ribolla","pr":"Long, texturé ; pelure d'orange séchée, oxydatif, finale saline et herbacée","ps":"Un orange slovène d'un vigneron disparu : long et texturé, pelure d'orange séchée, salin et herbacé.","ca":0,"al":0},{"id":"V024","n":"Arancione, Grape Republic, Yamagata, 2022","nom":"Arancione","c":"Vins Oranges","p":"Japon","cp":"87% Delaware, 5% Steuben, 5% Neo Muscat, 3% Merlot","pr":"Superposé, texturé, exubérant, umami ; pelure d'orange et thé au jasmin","ps":"Un orange japonais unique : texturé, umami, sur la pelure d'orange et le thé au jasmin — sans SO2.","ca":0,"al":0},{"id":"V025","n":"DJ Meu, Vignoble de la Bauge, Québec, 2024","nom":"DJ Meu","c":"Vins Rouges","p":"Québec","cp":"80% Petite Perle, 20% Cabernet Franc","pr":"Vibrant, poivré, fruité, atypique, frais","ps":"Un rouge québécois biodynamique atypique : vibrant, poivré et fruité — cépages hybrides de régénération.","ca":0,"al":0},{"id":"V027","n":"Juliénas Vieilles Vignes, Domaine des Chers, Beaujolais, 2023","nom":"Juliénas Vieilles Vignes","c":"Vins Rouges","p":"France","cp":"100% Gamay","pr":"Fin, complexe ; cassis, violette, framboise","ps":"Un Juliénas en vieilles vignes, fin et complexe : cassis, violette et framboise.","ca":0,"al":0},{"id":"V028","n":"Fleurie, Phénix, Les Bertrand, Beaujolais, 2023","nom":"Fleurie","c":"Vins Rouges","p":"France","cp":"100% Gamay","pr":"Puissant, fin, gracieux ; violette et trame minérale très caillouteuse","ps":"Un Fleurie bio de petite parcelle : puissant et gracieux, sur la violette et un minéral caillouteux.","ca":0,"al":0},{"id":"V030","n":"Pessac-Léognan, Couhins La Gravette, Bordeaux, 2019","nom":"Pessac-Léognan","c":"Vins Rouges","p":"France","cp":"50% Merlot, 41% Cab. Sauv., 5% Cab. Franc, 4% Petit Verdot","pr":"Fruité, gourmand, expressif ; fruits noirs, épices, attaque souple, finale ferme","ps":"Un Pessac-Léognan raisonné, fruité et expressif : fruits noirs, épices, attaque souple et finale ferme.","ca":0,"al":0},{"id":"V031","n":"Saint-Émilion Grand Cru, Château Haut-Segottes, Bordeaux, 2018","nom":"Saint-Émilion Grand Cru","c":"Vins Rouges","p":"France","cp":"60% Merlot, 40% Cabernet Franc","pr":"Évolué, racé, typique, structuré, harmonieux ; fruit rouge et bois","ps":"Un Saint-Émilion Grand Cru évolué et racé : structuré, harmonieux, sur le fruit rouge et le bois.","ca":0,"al":0},{"id":"V032","n":"Cahors, An 1152, Gérard Bertrand, Sud-Ouest, 2022","nom":"Cahors","c":"Vins Rouges","p":"France","cp":"100% Malbec","pr":"Puissant, rond, intense ; fruit noir, violette, finale réglisse noire","ps":"Un Cahors 100% Malbec biodynamique : puissant et intense, fruit noir, violette et réglisse.","ca":0,"al":0},{"id":"V034","n":"Côte d'Or, Jean Fournier, Bourgogne, 2023","nom":"Côte d'Or","c":"Vins Rouges","p":"France","cp":"100% Pinot Noir","pr":"Gourmand, précis, fruité, longue finale crayeuse","ps":"Un Pinot Noir de Marsannay bio, déclassé en Côte d'Or : gourmand, précis et crayeux.","ca":0,"al":0},{"id":"V035","n":"Fixin, René Bouvier, Bourgogne, 2020","nom":"Fixin","c":"Vins Rouges","p":"France","cp":"100% Pinot Noir","pr":"Sauvage, structuré, solaire ; fruit rouge et fleur, minéralité franche et saline","ps":"Un Fixin de vieilles vignes sauvage et structuré : fruit rouge, fleur et minéralité saline.","ca":0,"al":0},{"id":"V036","n":"Côte de Nuits-Villages, Les Retraits, Domaine Thiriet, Bourgogne, 2020","nom":"Côte de Nuits-Villages","c":"Vins Rouges","p":"France","cp":"100% Pinot Noir","pr":"Riche, dense, puissant, profond ; fruit noir, cerise noire, cassis, bleuet, sous-bois, épices","ps":"Un Côte de Nuits-Villages de très petite production : riche, dense et profond — de la belle Bourgogne à carafer.","ca":1,"al":1},{"id":"V037","n":"Chapeau Melon, Jérémie Huchet, Loire, 2024","nom":"Chapeau Melon","c":"Vins Rouges","p":"France","cp":"Pinot Noir, Gamay","pr":"Souple, gouleyant, sur le petit fruit rouge","ps":"Un rouge de Loire souple et gouleyant sur le petit fruit rouge — vin de soif impeccable.","ca":0,"al":0},{"id":"V038","n":"Coteaux du Giennois, Berthier, Loire, 2023","nom":"Coteaux du Giennois","c":"Vins Rouges","p":"France","cp":"Pinot Noir, Gamay","pr":"Charnu, juteux, soyeux ; cerise, myrtille, mûre, trame épicée","ps":"Un rouge organique voisin de Sancerre : charnu, juteux et soyeux sur la cerise, la myrtille et la mûre.","ca":0,"al":0},{"id":"V039","n":"Gondwana, Château de Fosse-Sèche, Loire, 2019","nom":"Gondwana","c":"Vins Rouges","p":"France","cp":"100% Cabernet Franc","pr":"Précis, vif, élégant, herbacé ; fruit rouge et noir, violette, pivoine, poivre, silex","ps":"Un Cabernet Franc biodynamique du 13e siècle : précis et élégant, herbacé, sur le poivre et le silex.","ca":0,"al":0},{"id":"V042","n":"Cornas, Rebelle, David Reynaud, Rhône, 2023","nom":"Cornas","c":"Vins Rouges","p":"France","cp":"100% Syrah","pr":"Élégant, concentré, charpenté ; mûre, bleuet, violette, réglisse, poivre, graphite","ps":"Un Cornas biodynamique élégant et concentré : mûre, violette, graphite — à carafer.","ca":1,"al":1},{"id":"V043","n":"Saint-Joseph, Le Berceau, Bernard Gripa, Rhône, 2022","nom":"Saint-Joseph","c":"Vins Rouges","p":"France","cp":"100% Syrah","pr":"Charnu, dense, complexe ; fruit noir confituré, myrtille, pivoine, poivre de szechuan, graphite","ps":"Un Saint-Joseph de 80 ans de vignes : dense et complexe, pivoine, poivre de szechuan et graphite — à carafer.","ca":1,"al":1},{"id":"V044","n":"Mesdi Rosso, Casina Bric, Piémont, 2022","nom":"Mesdi Rosso","c":"Vins Rouges","p":"Italie","cp":"100% Nebbiolo","pr":"Structuré, frais ; fruit rouge, pétale de rose, épices douces","ps":"Un Nebbiolo de Barolo frais et élégant : fruit rouge, rose et épices douces — plus accessible que le Barolo classique.","ca":0,"al":0},{"id":"V045","n":"Barbera D'Asti, Le Querce, Cascina Galarin, Piémont, 2023","nom":"Barbera D'Asti","c":"Vins Rouges","p":"Italie","cp":"95% Barbera, 5% Freisa","pr":"Rafraîchissant, balancé, complexe ; arômes intenses de fruits noirs","ps":"Un Barbera d'Asti bio rafraîchissant et balancé : intense sur les fruits noirs.","ca":0,"al":0},{"id":"V046","n":"Matot, Cascina Galarin, Piémont, 2024","nom":"Matot","c":"Vins Rouges","p":"Italie","cp":"100% Nebbiolo","pr":"Robuste, complexe, intense ; framboise sauvage et menthe","ps":"Un Nebbiolo de la Galarin robuste et intense : framboise sauvage et menthe — belle complexité.","ca":0,"al":0},{"id":"V048","n":"Barolo, Caviot, Ca'Viola, Piémont, 2020","nom":"Barolo","c":"Vins Rouges","p":"Italie","cp":"100% Nebbiolo","pr":"Prêt à boire en jeunesse, généreux, soyeux ; petit fruit intense, finale balsamique","ps":"Un Barolo généreux et accessible en jeunesse : soyeux, petit fruit intense et finale balsamique.","ca":0,"al":0},{"id":"V049","n":"Galante, Podere Gualandi, Toscane, 2022","nom":"Galante","c":"Vins Rouges","p":"Italie","cp":"Sangiovese, Pugnitello, Foglia Tonda","pr":"Puissant, rustique, authentique ; fruit rouge mûr, tabac, épices","ps":"Un rouge toscan bio élevé en fût de châtaignier : rustique et authentique, fruit rouge mûr et tabac.","ca":0,"al":0},{"id":"V050","n":"Campo della Macchia, Azienda Piancornello, Toscane, 2022","nom":"Campo della Macchia","c":"Vins Rouges","p":"Italie","cp":"Sangiovese, Syrah, Colorino","pr":"Bien balancé, souple, généreux ; fruit rouge et noir, herbes séchées, feuille de tomate","ps":"Un rouge de Montalcino balancé : souple et généreux sur le fruit rouge, les herbes et la feuille de tomate.","ca":0,"al":0},{"id":"V051","n":"Chianti Classico, Le Fioraie, Piemaggio, Toscane, 2020","nom":"Chianti Classico","c":"Vins Rouges","p":"Italie","cp":"90% Sangiovese, 10% Colorino, Canaiolo","pr":"Chianti très classique, équilibré, facile à boire, fruit éclatant","ps":"Un Chianti Classico exemplaire : équilibré, facile à boire, fruit éclatant — le Chianti tel qu'il devrait être.","ca":0,"al":0},{"id":"V052","n":"Vino Nobile di Montepulciano, Salco, Salcheto, Toscane, 2023","nom":"Vino Nobile","c":"Vins Rouges","p":"Italie","cp":"100% Sangiovese","pr":"Concentré, ample, soyeux ; fruit mûr, épice, bois bien intégré, finale persistante","ps":"Un Vino Nobile de grande sélection biodynamique : concentré et ample, élevé 6 ans au total.","ca":0,"al":1},{"id":"V053","n":"Brunello di Montalcino, Franco Pacenti, Toscane, 2019","nom":"Brunello di Montalcino","c":"Vins Rouges","p":"Italie","cp":"100% Sangiovese","pr":"Élégant, harmonieux, persistant, intense ; fruité, toasté, trame balsamique","ps":"Un Brunello élégant et persistant de la 3e génération : fruité, toasté et balsamique.","ca":0,"al":0},{"id":"V054","n":"Massoreale Sangiovese, Cantina Tollo, Abruzzes, 2022","nom":"Massoreale Sangiovese","c":"Vins Rouges","p":"Italie","cp":"100% Sangiovese","pr":"Rond, épicé, expressif ; petit fruit noir","ps":"Un Sangiovese des Abruzzes de la meilleure coopérative de la région : rond et expressif sur le petit fruit noir.","ca":0,"al":0},{"id":"V055","n":"Terre Siciliane, Nerello Mascalese, Vino Lauria, 2022","nom":"Terre Siciliane","c":"Vins Rouges","p":"Italie","cp":"100% Nerello Mascalese","pr":"Chaleureux, terreux, épicé ; fruit rouge, herbes séchées, muscade, balsamique","ps":"Un Nerello sicilien bio chaleureux et terreux : épicé, herbes séchées et finale de feuille de tomate.","ca":0,"al":0},{"id":"V056","n":"Amarone della Valpolicella Classico, GASO, San Rustico, Vénétie, 2015","nom":"Amarone della Valpolicella","c":"Vins Rouges","p":"Italie","cp":"60% Corvina, 35% Rondinella, 5% Molinara","pr":"Généreux, riche, rond, velouté ; fruit séché, vanille, chocolat, poivre, réglisse","ps":"Un Amarone classique de la famille depuis 1870 : riche, velouté, sur le fruit séché et la vanille — à carafer.","ca":1,"al":1},{"id":"V058","n":"FOSC, Finca Parera, Penedès, 2024","nom":"FOSC","c":"Vins Rouges","p":"Espagne","cp":"Sumoll, Tempranillo, Grenache Noir, Monastrell, Syrah","pr":"Vif, souple ; fruit rouge et épices","ps":"Un rouge nature du Penedès sans intrants : vif, souple, fruit rouge et épices — mis en bouteille en lune descendante.","ca":0,"al":0},{"id":"V059","n":"Ribera del Duero, Eremus Reserva, Paramo Arroyo, 2014","nom":"Ribera del Duero","c":"Vins Rouges","p":"Espagne","cp":"100% Tempranillo","pr":"Élégant, puissant, évolué ; fruit mûr, balsamique, tertiaire","ps":"Un Ribera del Duero biodynamique de vignes de 60 ans : élégant, puissant, sur le fruit mûr et le balsamique.","ca":0,"al":0},{"id":"V060","n":"GEA Vina Antartida, Alcardet Bodegas, Tierra de Castilla, 2023","nom":"GEA Vina Antartida","c":"Vins Rouges","p":"Espagne","cp":"100% Cabernet Sauvignon","pr":"Souple, fruité, délicat ; groseilles, cèdre, poivron rouge","ps":"Un Cabernet Sauvignon bio espagnol souple et polyvalent : groseilles, cèdre et poivron rouge.","ca":0,"al":0},{"id":"V063","n":"Kalkstein, Claus Preisinger, Burgenland, 2024","nom":"Kalkstein","c":"Vins Rouges","p":"Autriche","cp":"100% Blaufränkisch","pr":"Léger, précis, vibrant ; groseille, mûre, cerise kirschée, poivre blanc, touche fumée","ps":"Un Blaufränkisch biodynamique léger et précis de Preisinger : groseille, cerise kirschée et poivre blanc.","ca":0,"al":0},{"id":"V064","n":"Pannobile, Weingut Renner, Burgenland, 2019","nom":"Pannobile","c":"Vins Rouges","p":"Autriche","cp":"Blaufränkisch, Zweigelt, Saint-Laurent","pr":"Élégant, épicé, juteux, vif ; fruit noir sauvage, herbe fumée, réglisse, hibiscus","ps":"Un Pannobile du collectif biodynamique autrichien : juteux et épicé, fruit noir sauvage et hibiscus.","ca":0,"al":0},{"id":"V065","n":"Sabotage, Gonc, Stajerska, 2022","nom":"Sabotage","c":"Vins Rouges","p":"Slovénie","cp":"100% Blaufränkisch","pr":"Intense, floral, fruité ; fruit noir prononcé, fleur bleue, épices du Moyen-Orient","ps":"Un Blaufränkisch slovène concentré par congélation : intense, floral sur le fruit noir et les épices orientales.","ca":0,"al":0},{"id":"V066","n":"Cause Toujours, Jean-Philippe Vanstals, Wallonie, 2023","nom":"Cause Toujours","c":"Vins Rouges","p":"Belgique","cp":"Syrah, Merlot","pr":"Frais, très léger, vif ; fruit rouge et bonbon","ps":"Une Syrah belge pionnière, très légère et fraîche : fruit rouge et bonbon — inattendu et charmant.","ca":0,"al":0},{"id":"V067","n":"Stellenbosch, Pearce Predhomme Cinsault / Syrah, Radford Dale, 2023","nom":"Stellenbosch","c":"Vins Rouges","p":"Afrique du Sud","cp":"50% Cinsault, 50% Syrah","pr":"Délicat, léger, goûteux ; fruit rouge et noir frais, trame très épicée","ps":"Un rouge du Cap léger et goûteux : fruit rouge et noir frais sur une trame très épicée.","ca":0,"al":0},{"id":"V068","n":"Cavalier du Versant, Domaine Gélinas, Québec, 2023","nom":"Cavalier du Versant","c":"Vins Blancs","p":"Québec","cp":"Swenson Blanc, Louise Swenson","pr":"Explosif, attaque fraîche, onctuosité gourmande ; melon-miel, litchi, ananas, citron, vanille","ps":"Un blanc québécois hybride explosif et tropical : litchi, ananas, fleur de vanille — accueil parfait.","ca":0,"al":0},{"id":"V070","n":"RéGénération, Vignoble de la Bauge, Québec, 2024","nom":"RéGénération","c":"Vins Blancs","p":"Québec","cp":"Frontenac Blanc, La Crescent, Gewurztraminer","pr":"Friand, exubérant, crémeux mais énergétique","ps":"Un blanc biodynamique québécois de régénération : exubérant, crémeux et énergétique.","ca":0,"al":0},{"id":"V072","n":"Chardonnay Réserve, Domaine Camy, Québec, 2024","nom":"Chardonnay Réserve","c":"Vins Blancs","p":"Québec","cp":"100% Chardonnay","pr":"Profil bourguignon, fraîcheur québécoise ; rond, pur, crayeux ; fruit blanc, canneberge blanche","ps":"Un chardonnay québécois au profil bourguignon : crayeux, minéral, avec une touche de canneberge blanche.","ca":0,"al":0},{"id":"V073","n":"Black Ball, Pearl Morrissette, Niagara, 2021","nom":"Black Ball","c":"Vins Blancs","p":"Ontario","cp":"100% Riesling","pr":"Texture tendre, délicat, subtil ; florales, pommes fumées, citron, poire","ps":"Un riesling ontarien organique tout en délicatesse : floral, citronné, avec une légère prise de gaz.","ca":0,"al":0},{"id":"V074","n":"Alsace, Feu Follet, Domaine Stoeffler, 2024 (Macération)","nom":"Feu Follet","c":"Vins Blancs","p":"France","cp":"Muscat, Gewurztraminer, Riesling","pr":"Complexe, mature, exubérant ; fruit surmûri, pêche compotée, trame épicée légèrement tannique","ps":"Un orange alsacien biodynamique sur 3 cépages aromatiques : exubérant, épicé, légèrement tannique.","ca":0,"al":0},{"id":"V077","n":"Chablis, Domaine Adrien Besson, Bourgogne, 2023","nom":"Chablis (Adrien Besson)","c":"Vins Blancs","p":"France","cp":"100% Chardonnay","pr":"Mûr, vif, corsé, persistant ; poire, abricot, ananas, fleurs blanches","ps":"Un Chablis mûr et corsé : poire, abricot, ananas — à ne pas confondre avec le Grand Cru du même domaine.","ca":0,"al":1},{"id":"V078","n":"Chablis 1er Cru Montmains, Louis Michel et Fils, Bourgogne, 2023","nom":"Chablis 1er Cru Montmains","c":"Vins Blancs","p":"France","cp":"100% Chardonnay","pr":"Mûr, confit, frais ; amande grillée, citron confit, touche crayeuse, iodé","ps":"Un 1er Cru Montmains mûr et confit, sur l'amande grillée et le citron confit — à carafer.","ca":1,"al":1},{"id":"V079","n":"Chablis 1er Cru Mont de Milieux, Domaine de l'Enclos, Bourgogne, 2023","nom":"Chablis 1er Cru Mont de Milieux","c":"Vins Blancs","p":"France","cp":"100% Chardonnay","pr":"Mûr, élégant, cristallin, crémeux ; citron, poire jaune, miel d'acacia, tension minérale saline et mentholée","ps":"Un 1er Cru comparable aux Grand Crus : cristallin, salin et mentholé.","ca":0,"al":0},{"id":"V080","n":"Chablis Grand Cru Vaudésir, Domaine Adrien Besson, Bourgogne, 2021","nom":"Chablis Grand Cru Vaudésir","c":"Vins Blancs","p":"France","cp":"100% Chardonnay","pr":"Souple, fin, beurré, texture raffinée, floral, minéralité marquée","ps":"Le Grand Cru Vaudésir d'Adrien Besson : beurré, floral, texture raffinée — le sommet de la maison.","ca":0,"al":0},{"id":"V081","n":"Vézelay, Champs Cervin, Domaine Thiriet, Bourgogne, 2020","nom":"Vézelay","c":"Vins Blancs","p":"France","cp":"100% Chardonnay","pr":"Tendu, ferme, minéralité saline, gourmand mais délicat ; orange, cantaloup, peau de pêche, réglisse","ps":"Un Vézelay de très petite production : tendu, salin, sur l'orange et le cantaloup.","ca":0,"al":0},{"id":"V083","n":"Java, La Cave Apicole, Roussillon, 2023","nom":"Java","c":"Vins Blancs","p":"France","cp":"60% Muscat à Petit Grain, 40% Muscat d'Alexandrie","pr":"Exubérant, juteux, frais, gourmand, aromatique, vif","ps":"Un blanc du Roussillon 100% Muscat : aromatique, juteux et gourmand — pour les amateurs de fruit.","ca":0,"al":0},{"id":"V084","n":"Muscadet Sèvre et Maine sur lie, Fief aux Dames, Julien Braud, Loire, 2023","nom":"Muscadet Sèvre et Maine","c":"Vins Blancs","p":"France","cp":"100% Melon de Bourgogne","pr":"Algué, salin, texturé","ps":"Un Muscadet de caractère : algué, salin et texturé — élevé en cuve de béton souterraine.","ca":0,"al":0},{"id":"V086","n":"Cheninsolite, Domaine Cady, Loire, 2023","nom":"Cheninsolite","c":"Vins Blancs","p":"France","cp":"100% Chenin Blanc","pr":"Fougueux, frais, gourmand ; fruit blanc à noyau, miel, finale légèrement épicée","ps":"Un Chenin d'Anjou bio fougueux et gourmand : fruit blanc, miel et épices en finale.","ca":0,"al":0},{"id":"V087","n":"Sancerre, Cuvée Stéphane, Paul Cherrier, Loire, 2023","nom":"Sancerre","c":"Vins Blancs","p":"France","cp":"100% Sauvignon Blanc","pr":"Croustillant, texture délicate et acidulée ; citron, pamplemousse, fruit de la passion","ps":"Un Sancerre bio croustillant : citron, pamplemousse et fruit de la passion — l'expression type de l'appellation.","ca":0,"al":0},{"id":"V088","n":"Clos les Montys Vignes de 1914, Jérémie Huchet, Loire, 2022","nom":"Clos les Montys (1914)","c":"Vins Blancs","p":"France","cp":"100% Melon de Bourgogne","pr":"Riche, charnu, frais ; fruit mature, minéralité amère, trame fumée","ps":"Un Muscadet de vignes centenaires : riche, charnu, avec une minéralité amère et fumée.","ca":0,"al":0},{"id":"V089","n":"Clos du Breuil, François Chidaine, Loire, 2022","nom":"Clos du Breuil","c":"Vins Blancs","p":"France","cp":"100% Chenin Blanc","pr":"Pur, vivant, vif, belle amertume finale, mûr, mielleux","ps":"Un Chenin de Montlouis biodynamique pur et vivant : mûr, mielleux avec une belle amertume finale.","ca":0,"al":0},{"id":"V092","n":"Les Sables Fauves, Laballe, Sud-Ouest, 2022","nom":"Les Sables Fauves","c":"Vins Blancs","p":"France","cp":"Gros Manseng, Colombard, Ugni Blanc","pr":"Minéralité impressionnante (oxyde de fer) ; équilibre douceur-fraîcheur ; yuzu, pêche mûre, fleur blanche","ps":"Un blanc du Sud-Ouest sur sol unique de Sable Fauve : minéralité marquée, yuzu et pêche mûre.","ca":0,"al":0},{"id":"V093","n":"Infiniment Blanc, Domaine Alloïs, Provence, 2023","nom":"Infiniment Blanc","c":"Vins Blancs","p":"France","cp":"Vermentino, Roussanne, Grenache Blanc, Clairette","pr":"Soyeux, rafraîchissant ; fleur blanche, agrume, fruit à chair blanche","ps":"Un blanc de Provence biodynamique soyeux : fleur blanche, agrume, fruit à chair blanche.","ca":0,"al":0},{"id":"V094","n":"Colli Tortonesi, Derthona Timorasso, Piémont, 2023","nom":"Colli Tortonesi Timorasso","c":"Vins Blancs","p":"Italie","cp":"100% Timorasso","pr":"Frais, intense, persistant ; goudron, silex, agrume, fleur","ps":"Un Timorasso du Piémont intense et minéral : goudron, silex et agrumes — cépage à découvrir.","ca":0,"al":0},{"id":"V095","n":"Pinot Grigio delle Venezie, Trevisana, Vénétie, 2024","nom":"Pinot Grigio delle Venezie","c":"Vins Blancs","p":"Italie","cp":"100% Pinot Gris","pr":"Harmonieux, fruité, persistant, vif ; pomme, figue, finale amande amère","ps":"Un Pinot Grigio bio avec une touche de macération : pomme, figue et amande amère — au-dessus du lot.","ca":0,"al":0},{"id":"V098","n":"Blanc Seleccio, Can Feixes, Catalogne, 2024","nom":"Blanc Seleccio","c":"Vins Blancs","p":"Espagne","cp":"Parellada, Macabeo, Xarel-lo, Chardonnay, Malvasia","pr":"Pur, expressif, vif ; citron, pomme verte, pamplemousse, herbes fraîches ; minérale et florale","ps":"Un blanc catalan bio fondé en 1768 : pur et expressif sur le citron, la pomme verte et les herbes fraîches.","ca":0,"al":0},{"id":"V101","n":"Douro, Branco, Pormenor, 2024","nom":"Douro Branco","c":"Vins Blancs","p":"Portugal","cp":"Rabigato, Malvasia, Codega do Larinho, Gouveivo","pr":"Tendu, balancé, légèrement oxydé ; tropical, agrumes, ananas, pelure de banane","ps":"Un blanc du Douro en altitude : tendu, légèrement oxydatif, tropical et grasse.","ca":0,"al":0},{"id":"V102","n":"Vinho Verde, Loureiro, Quinta da Palmirinha, 2024","nom":"Vinho Verde Loureiro","c":"Vins Blancs","p":"Portugal","cp":"100% Loureiro","pr":"Texturé, profond, long, trame minérale impressionnante","ps":"Un Loureiro biodynamique pionnier : texturé, profond, avec une minéralité impressionnante.","ca":0,"al":0},{"id":"V105","n":"Dino SGV Raw, Sebastian Strub, Rheinhessen, 2024","nom":"Dino SGV Raw","c":"Vins Blancs","p":"Allemagne","cp":"40% Sylvaner, 60% Grüner Veltliner","pr":"Frais, gourmand, texturé ; fruit à noyau mûr, nectarine, mandarine","ps":"Un blanc nature rhénane de la 11e génération : texturé, nectarine et mandarine, longue finale.","ca":0,"al":0},{"id":"V106","n":"Schiefer Riesling, Staffelter Hof, Moselle, 2023","nom":"Schiefer Riesling","c":"Vins Blancs","p":"Allemagne","cp":"100% Riesling","pr":"Frais, électrisant, ciselant, minéral, citronné","ps":"Un Riesling de Moselle du + vieux domaine au monde (862 ap. JC) : électrisant, minéral, citronné.","ca":0,"al":0},{"id":"V107","n":"Old School, Staffelter Hof, Moselle, 2022","nom":"Old School","c":"Vins Blancs","p":"Allemagne","cp":"100% Riesling","pr":"Style bas en alcool (9%), très haute acidité, ample, salin ; lime, fleur blanche, pierre à fusil","ps":"Un Riesling de Moselle en vieux foudre, 9% alc. : ample, salin, lime et pierre à fusil.","ca":0,"al":0},{"id":"V108","n":"Papa's Panda Rising, Staffelter Hof, Moselle, 2022","nom":"Papa's Panda Rising","c":"Vins Blancs","p":"Allemagne","cp":"100% Riesling","pr":"Frais, fruité, éclatant, levuré ; pamplemousse","ps":"Un Riesling expressif de la plus vieille maison mondiale : fruité, éclatant, tout en pamplemousse.","ca":0,"al":0},{"id":"V110","n":"Stratos White, Tom Straka, Burgenland","nom":"Stratos White","c":"Vins Blancs","p":"Autriche","cp":"Welschriesling, Riesling, Chardonnay","pr":"Frais, élégant, raffiné, éclatant ; citron, poire, fleur blanche","ps":"Un blanc autrichien bio fin et éclatant : citron, poire et fleur blanche, acidité parfaitement intégrée.","ca":0,"al":0},{"id":"V112","n":"ErDELuftGRAssundreBEN, GV, Claus Preisinger, Burgenland, 2021","nom":"ErDELuftGRAssundreBEN","c":"Vins Blancs","p":"Autriche","cp":"100% Grüner Veltliner","pr":"Sauvage, fumé, élégant, herbacé, citronné ; minéral ; fruit juteux, miel, poivre blanc","ps":"Un Grüner Veltliner nature de Preisinger : sauvage, fumé, herbacé et minéral — une expérience.","ca":0,"al":0},{"id":"V113","n":"Riesling Smaragd Achleiten, Domäne Wachau, Niederösterreich, 2023","nom":"Riesling Smaragd Achleiten","c":"Vins Blancs","p":"Autriche","cp":"100% Riesling","pr":"Minéralité racée, puissant, structuré, profond ; pêche, abricot, ananas, herbes de prairie","ps":"Un Smaragd de la Wachau puissant et racé : profond, sur la pêche, l'abricot et l'ananas.","ca":0,"al":0},{"id":"V114","n":"Stompie Chenin Blanc, Johan Herman Meyer, Western Cape","nom":"Stompie Chenin Blanc","c":"Vins Blancs","p":"Afrique Du Sud","cp":"100% Chenin Blanc","pr":"Frais, vivant, authentique ; agrume et trame fermière prononcée","ps":"Un Chenin d'Afrique du Sud bio : vivant et authentique, avec des agrumes et un côté fermier prononcé.","ca":0,"al":0},{"id":"V116","n":"Chardonnay Monterey, Clos Lachance, Californie, 2021","nom":"Chardonnay Monterey","c":"Vins Blancs","p":"États-Unis","cp":"100% Chardonnay","pr":"Mi-corsé, velouté, svelte ; citron, ananas, beurre, épices boisées","ps":"Un Chardonnay californien velouté et tropical : citron, ananas, beurre et épices boisées.","ca":0,"al":0},{"id":"V117","n":"Chardonnay, Jordan Winery, Californie, 2021","nom":"Chardonnay Jordan","c":"Vins Blancs","p":"États-Unis","cp":"100% Chardonnay","pr":"Légèrement boisé ; citron meyer, poire asiatique, pamplemousse, finale crémeuse","ps":"Un Chardonnay de Sonoma légèrement boisé : citron meyer, poire asiatique, finale crémeuse.","ca":0,"al":0},{"id":"V118","n":"Ces Petits Imprévus, Domaine du Nival, 2024","nom":"Ces Petits Imprévus","c":"Vins Effervescents, Cidres et Bières","p":"Québec","cp":"100% Vidal","pr":"Très léger, bulle fine et enrobante, arômes variétaux du vidal, finale vive","ps":"Un petnat québécois tout en légèreté — bulle fine, arômes de vidal et finale vive.","ca":0,"al":0},{"id":"V119","n":"Galipette, Christophe Pueyo, Bordeaux, 2022","nom":"Galipette","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"60% Sémillon, 20% Muscadelle, 20% Sauvignon Blanc","pr":"Florales, camomille, miellées ; bulle végétale et soyeuse","ps":"Un petnat bordelais nature, floral et miellé, à la bulle soyeuse — gourmand et facile.","ca":0,"al":0},{"id":"V120","n":"Bulles de Soif, Terra Vita Vinum, Loire, 2024","nom":"Bulles de Soif","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"95% Chardonnay, 5% Cabernet Franc","pr":"Légère, fruitée, désaltérante ; fraîcheur vive et gourmande","ps":"Un petnat de soif sans sulfite ajouté : léger, fruité, désaltérant — la bulle plaisir.","ca":0,"al":0},{"id":"V121","n":"Crémant de Loire Brut, Domaine Cady, 2023","nom":"Crémant de Loire Brut","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"70% Chenin Blanc, 30% Chardonnay","pr":"Frais, fruité, équilibré ; fruit sec grillé et trame florale","ps":"Un crémant de Loire bio élevé 3 ans sur lattes : frais, équilibré, sur le fruit sec grillé.","ca":0,"al":0},{"id":"V122","n":"Crémant du Jura Zéro Dosage, Champ Divin, 2023","nom":"Crémant du Jura Zéro Dosage","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"Chardonnay, Savagnin, Pinot Noir","pr":"Précis, austère, vif ; fruit mûr, trame saline, minéralité jurassienne racée","ps":"Un crémant du Jura zéro dosage, droit et salin, marqué par la minéralité jurassienne.","ca":0,"al":0},{"id":"V123","n":"Champagne, Beaux Partis, Amarier et Filles","nom":"Champagne Beaux Partis","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"40% Pinot Meunier, 30% Chardonnay, 30% Pinot Noir","pr":"Fin, cristallin, minéral","ps":"Un champagne d'assemblage fin et cristallin, tout en minéralité — extra brut élégant.","ca":0,"al":0},{"id":"V124","n":"Champagne, Éloquence Extra Brut, J.L. Vergnon, Côte des Blancs","nom":"Champagne Éloquence","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"100% Chardonnay","pr":"Tendu, tranchant, pur, précis ; pamplemousse, amande, biscuit, poivre ; minéralité crayeuse et saline","ps":"Un blanc de blancs Grand Cru de la Côte des Blancs : tendu, crayeux, salin et précis.","ca":0,"al":0},{"id":"V125","n":"Champagne, Come des Tallants, Piollot, Côte des Bars, 2020","nom":"Champagne Come des Tallants","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"100% Pinot Noir","pr":"Fin, concentré, élégant ; mirabelle, goyave, menthe ; floralité diverse","ps":"Un blanc de noirs parcellaire zéro dosage : concentré, élégant, sur la mirabelle et la menthe.","ca":0,"al":0},{"id":"V126","n":"Cava, Vita Vitet, Celler Jan Vidal, Catalogne, NM","nom":"Cava Vita Vitet","c":"Vins Effervescents, Cidres et Bières","p":"Espagne","cp":"Xarel-lo, Macabeo, Parellada","pr":"Élégant, frais, facile à boire ; fruits à noyau, florales ; finale moyennement longue, toastée","ps":"Un cava bio zéro dosage, élégant et facile : fruits à noyau, touche toastée.","ca":0,"al":0},{"id":"V128","n":"Perline, Pinard et Filles, 2023","nom":"Perline","c":"Vins Effervescents, Cidres et Bières","p":"Québec","cp":"100% Frontenac Noir","pr":"Nerveux, frais, désaltérant, énergétique","ps":"Un perlant québécois sur frontenac : nerveux, frais et énergisant.","ca":0,"al":0},{"id":"X138","n":"Champagne, Les Cousines, Amarier et Filles","nom":"Champagne Les Cousines","c":"Vins Effervescents, Cidres et Bières","p":"France","cp":"80% Pinot Meunier, 20% Pinot Noir","pr":"Belle rondeur (léger sucre résiduel), minéralité prononcée","ps":"Un champagne de vigneronnes dominé par le meunier : rond, minéral, accessible.","ca":0,"al":0},{"id":"X139","n":"Kalkspitz, Christophe Hoch, Kremstal","nom":"Kalkspitz","c":"Vins Effervescents, Cidres et Bières","p":"Autriche","cp":"70% Grüner Veltliner, 30% Zweigelt","pr":"Acidité crayeuse distinctive, pure, précise ; lime, menthe ; mousse élégante","ps":"Une bulle autrichienne crayeuse et précise, sur la lime et la menthe — vibrante.","ca":0,"al":0},{"id":"X140","n":"Et si on allait sur la lune?, Domaine Bergeville, 2024","nom":"Et si on allait sur la lune?","c":"Vins Effervescents, Cidres et Bières","p":"Québec","cp":"Frontenac Noir, Frontenac Blanc, Marquette, Acadie Blanc, Vidal","pr":"Fringant, vif ; fraise, gadelle, griotte ; trame végétale et poivrée","ps":"Le premier Col Fondo rouge du Québec : fringant, vif, sur la griotte et une trame poivrée.","ca":0,"al":0},{"id":"X147","n":"Cour-Cheverny, Domaine Blanc, Philippe Tessier, Loire, 2023","nom":"Cour-Cheverny","c":"Vins Blancs","p":"France","cp":"100% Romorantin","pr":"Mi-corsé, vif ; fruit sec, fleur blanche, miel, coing, finale mentholée","ps":"Un Romorantin rare et méconnu : entre Chenin et Riesling, avec du coing et une finale mentholée.","ca":0,"al":0},{"id":"X148","n":"La Peau de l'Ours, Domaine de la Marinière, Loire, 2024","nom":"La Peau de l'Ours","c":"Vins Blancs","p":"France","cp":"100% Chenin Blanc","pr":"Frais, sur l'agrume du début à la fin, vivant","ps":"Un Chenin de Loire vivant et agrumé, du début à la fin.","ca":0,"al":0},{"id":"X150","n":"Taurus, Domaine de l'Écu, Loire, 2020","nom":"Taurus","c":"Vins Blancs","p":"France","cp":"100% Melon de Bourgogne","pr":"Gras, opulent, élancé par acidité fine ; fruits du verger, rhubarbe, poire, abricot, réglisse","ps":"Un Muscadet de haute expression : 24 mois en amphore, gras et opulent sur la poire et la réglisse.","ca":0,"al":0},{"id":"X154","n":"Vinho Verde, Granit, Soalheiro, 2024","nom":"Vinho Verde Granit","c":"Vins Blancs","p":"Portugal","cp":"100% Alvarinho","pr":"Fin, vif, effilé ; fruit à noyau, trame saline, minéralité prononcée sur pierre à fusil","ps":"Un Alvarinho biologique de Soalheiro : fin, effilé, salin avec une minéralité de pierre à fusil.","ca":0,"al":0},{"id":"X157","n":"Savage White, Duncan Savage, Western Cape, 2024","nom":"Savage White","c":"Vins Blancs","p":"Afrique du Sud","cp":"Sauvignon Blanc, Sémillon","pr":"Intense, texturé, riche ; pamplemousse, feuille de cassis, poire ; silex fumé","ps":"Un blanc du Cap intense et texturé : pamplemousse, cassis, silex fumé — vinification inspirée de Bordeaux et Bourgogne.","ca":0,"al":0},{"id":"X158","n":"Twenty Mile Bench, Cabernet Franc, Trois Moineaux, 2020","nom":"Twenty Mile Bench","c":"Vins Rouges","p":"Ontario","cp":"100% Cabernet Franc","pr":"Frais, juteux, gouleyant ; noyau de cerise, violette, rose, trame végétale","ps":"Un Cabernet Franc ontarien frais et juteux : cerise, violette, rose et belle signature végétale.","ca":0,"al":0},{"id":"X160","n":"Gaillac, Tombé du Ciel, Enclos des Braves, 2024","nom":"Tombé du Ciel","c":"Vins Rouges","p":"France","cp":"60% Braucol, 20% Prunelart, 20% Duras","pr":"Charnu, énergétique, vif ; fruit noir, réglisse, épices","ps":"Un Gaillac biodynamique sur cépages rares du Sud-Ouest : charnu et vif, fruit noir et réglisse.","ca":0,"al":0},{"id":"X161","n":"Bourgogne, Lucien Muzard et Fils, 2023","nom":"Bourgogne Muzard","c":"Vins Rouges","p":"France","cp":"100% Pinot Noir","pr":"Croquant, frais, suave ; cassis, trame sous-bois","ps":"Un Bourgogne rouge de vieilles vignes 1950 : croquant et suave, cassis et sous-bois — typicité parfaite.","ca":0,"al":0},{"id":"X164","n":"Côtes Catalanes, Thèse, Domaine Riberach, 2017","nom":"Côtes Catalanes","c":"Vins Rouges","p":"France","cp":"100% Grenache Noir","pr":"Ample, évolué, généreux ; fruit mûr, épices, trame animale","ps":"Un Grenache Noir du Roussillon relâché à l'apogée (2017) : ample, généreux, sur le fruit mûr et les épices.","ca":0,"al":0},{"id":"X165","n":"Crozes Hermitage, Tradition, Yann Chave, 2024","nom":"Crozes Hermitage","c":"Vins Rouges","p":"France","cp":"100% Syrah","pr":"Suave, soyeux, pulpeux ; cassis, mûre, cerise noire, réglisse, poivre","ps":"Un Crozes-Hermitage Syrah suave et soyeux : cassis, mûre, cerise noire et poivre — extraction délicate.","ca":0,"al":0},{"id":"X168","n":"Montepulciano D'Abruzzo, Nicola Di Sipio, 2022","nom":"Montepulciano D'Abruzzo","c":"Vins Rouges","p":"Italie","cp":"100% Montepulciano","pr":"Bien balancé, vigoureux, souple ; fruit noir, réglisse, épice douce","ps":"Un Montepulciano des Abruzzes vigoureux et souple : fruit noir, réglisse et épice douce.","ca":0,"al":0},{"id":"X172","n":"Valle de Uco, Cabernet Franc, Zuccardi Q, Mendoza, 2023","nom":"Valle de Uco","c":"Vins Rouges","p":"Argentine","cp":"100% Cabernet Franc","pr":"Végétal, ferme, long ; fruit noir, violette, longue finale sur le poivron","ps":"Un Cabernet Franc des Andes à 1400 m : végétal, ferme et long, fruit noir, violette et poivron.","ca":0,"al":0},{"id":"X173","n":"Ginger, Mr & Ms Theo, Rhône, 2023","nom":"Ginger","c":"Vins Oranges","p":"France","cp":"35% Roussanne, 35% Marsanne, 30% Grenache Blanc","pr":"Texturé, gourmand, expressif ; pelure d'orange, herbes médicinales, girofle, finale amère","ps":"Un orange du Rhône biodynamique texturé : pelure d'orange, herbes médicinales et girofle.","ca":0,"al":0},{"id":"X174","n":"Cavalier la Traverse, Domaine Gélinas, Québec, 2025","nom":"Cavalier la Traverse","c":"Vins Rosés","p":"Québec","cp":"Frontenac Noir, Frontenac Gris","pr":"Frais, juteux, gourmand ; goyave, fruit de la passion, canneberge","ps":"Un nouveau rosé québécois (2025) : frais et gourmand sur la goyave, le fruit de la passion et la canneberge.","ca":0,"al":0},{"id":"X175","n":"Rioja, Rosado, Librares, 2024","nom":"Rioja Rosado","c":"Vins Rosés","p":"Espagne","cp":"50% Tempranillo, 50% Grenache","pr":"Frais, gourmand, persistant ; fraise sauvage, bonbon, vanille","ps":"Un rosé de Rioja naturel, frais et gourmand : fraise sauvage, bonbon et vanille.","ca":0,"al":0},{"id":"X176","n":"Loin de l'Oeil, Domaine Plageoles, Sud-Ouest, 2016","nom":"Loin de l'Oeil","c":"Vins Moelleux","p":"France","cp":"100% Loin de l'Oeil","pr":"Fin, doux, équilibré ; coing, poire, fruits exotiques","ps":"Un liquoreux rare sur cépage autochtone : fin et équilibré sur le coing et la poire.","ca":0,"al":0},{"id":"X177","n":"Maderista Medium Dry, Madeira Collection","nom":"Maderista Medium Dry","c":"Vins Moelleux","p":"Portugal","cp":"100% Tinta Negra","pr":"Pur, frais, oxydatif ; noix et agrume","ps":"Un Madère bio élevé 7 ans avec une méthode atypique : pur, frais et oxydatif sur la noix et l'agrume.","ca":0,"al":0},{"id":"X178","n":"Porto Colheita, Feist, Douro, 2009","nom":"Porto Colheita","c":"Vins Moelleux","p":"Portugal","cp":"Touriga Nacional, Touriga Franca, Tinta Roriz, Tinta Barroca","pr":"Gourmand, opulent ; fruit noir séché, caramel, noix","ps":"Un Porto Colheita (mono-millésime) de Feist : opulent et gourmand sur le fruit noir séché, le caramel et la noix.","ca":0,"al":0}];

const CAT_CONFIG = {
  "Vins Effervescents, Cidres et Bières": { emoji: "🫧", short: "Bulles", color: "#8FBCDA", bg: "#0E2030" },
  "Vins Blancs": { emoji: "🥂", short: "Blancs", color: "#E8D5A3", bg: "#1E1A0E" },
  "Vins Rouges": { emoji: "🍷", short: "Rouges", color: "#C4506A", bg: "#1E0812" },
  "Vins Oranges": { emoji: "🟠", short: "Oranges", color: "#D4823A", bg: "#1E110A" },
  "Vins Rosés": { emoji: "🌸", short: "Rosés", color: "#D4888A", bg: "#1E0E0F" },
  "Vins Moelleux": { emoji: "🍯", short: "Moelleux", color: "#C9A84C", bg: "#1A1208" },
};

const ALL_CATS = Object.keys(CAT_CONFIG);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, n, exclude) {
  return shuffle(arr.filter(x => x !== exclude)).slice(0, n);
}

function genQuestion(vin, pool) {
  const types = ["profil", "cepage", "pays"];
  const type = types[Math.floor(Math.random() * types.length)];
  let question, reponse, options;

  if (type === "profil" && vin.pr) {
    question = `Quel vin correspond à ce profil ?\n\n« ${vin.pr} »`;
    reponse = vin.nom;
    const distracteurs = pick(pool.filter(v => v.c === vin.c && v.id !== vin.id).map(v => v.nom), 3, vin.nom);
    if (distracteurs.length < 3) return genQuestion(vin, pool);
    options = shuffle([reponse, ...distracteurs]);
  } else if (type === "cepage" && vin.cp) {
    question = `Quel est le cépage (ou assemblage) de\n\n${vin.nom} ?`;
    reponse = vin.cp;
    const distracteurs = pick(pool.filter(v => v.cp && v.cp !== vin.cp).map(v => v.cp), 3);
    if (distracteurs.length < 3) return genQuestion(vin, pool);
    options = shuffle([reponse, ...distracteurs]);
  } else {
    question = `De quel pays vient\n\n${vin.nom} ?`;
    reponse = vin.p;
    const allPays = [...new Set(pool.map(v => v.p))];
    const distracteurs = pick(allPays, 3, vin.p);
    if (distracteurs.length < 3) return genQuestion(vin, pool);
    options = shuffle([reponse, ...distracteurs]);
  }
  return { vin, question, reponse, options, type };
}

const s = { background: "#0A040A", color: "#F0E8E0", fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh", maxWidth: 480, margin: "0 auto", padding: 0 };

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCats, setSelectedCats] = useState([]);
  const [mode, setMode] = useState(null);
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [quizQ, setQuizQ] = useState(null);
  const [quizPool, setQuizPool] = useState([]);
  const [quizDone, setQuizDone] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [totalQuizSessions, setTotalQuizSessions] = useState(0);
  const [weakMode, setWeakMode] = useState(false);
  const [sessionLength, setSessionLength] = useState(null);
  const [wrongVins, setWrongVins] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("bedeau_daily") || "{}");
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (s.lastDate === today || s.lastDate === yesterday) return s.count || 0;
      return 0;
    } catch { return 0; }
  });
  const touchStartX = useRef(null);
  const [vinStats, setVinStats] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bedeau_stats") || "{}"); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("bedeau_stats", JSON.stringify(vinStats));
  }, [vinStats]);

  const vinsBycat = useMemo(() => {
    const m = {};
    ALL_CATS.forEach(c => { m[c] = VINS.filter(v => v.c === c); });
    return m;
  }, []);

  const filteredVins = useMemo(() => {
    if (selectedCats.length === 0) return VINS;
    return VINS.filter(v => selectedCats.includes(v.c));
  }, [selectedCats]);

  const flashVins = useMemo(() => shuffle(filteredVins), [filteredVins, mode]);

  const weakVins = useMemo(() => {
    return filteredVins
      .filter(v => (vinStats[v.id]?.w || 0) > 0)
      .sort((a, b) => {
        const ra = (vinStats[a.id]?.w || 0) / ((vinStats[a.id]?.w || 0) + (vinStats[a.id]?.c || 1));
        const rb = (vinStats[b.id]?.w || 0) / ((vinStats[b.id]?.w || 0) + (vinStats[b.id]?.c || 1));
        return rb - ra;
      });
  }, [filteredVins, vinStats]);

  const updateDailyStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    try {
      const saved = JSON.parse(localStorage.getItem("bedeau_daily") || "{}");
      if (saved.lastDate === today) return;
      const newCount = saved.lastDate === yesterday ? (saved.count || 0) + 1 : 1;
      localStorage.setItem("bedeau_daily", JSON.stringify({ count: newCount, lastDate: today }));
      setDailyStreak(newCount);
    } catch {}
  };

  const startMode = (m) => {
    const isWeak = m === "weak";
    setMode(isWeak ? "quiz" : m);
    setWeakMode(isWeak);
    setFlashIdx(0);
    setFlashFlipped(false);
    setScore(0);
    setStreak(0);
    setChosen(null);
    setLastCorrect(null);
    setWrongVins([]);
    if (m === "quiz" || isWeak) {
      const fullPool = shuffle(isWeak ? weakVins : filteredVins);
      const pool = sessionLength ? fullPool.slice(0, sessionLength) : fullPool;
      setQuizPool(pool);
      setQuizDone([]);
      setTotalQuizSessions(s => s + 1);
      const q = genQuestion(pool[0], filteredVins);
      setQuizQ(q);
    }
    setScreen("play");
  };

  const nextFlash = () => { setFlashIdx(i => (i + 1) % flashVins.length); setFlashFlipped(false); };
  const prevFlash = () => { setFlashIdx(i => (i - 1 + flashVins.length) % flashVins.length); setFlashFlipped(false); };

  const handleAnswer = (opt) => {
    if (chosen) return;
    setChosen(opt);
    const correct = opt === quizQ.reponse;
    setLastCorrect(correct);
    const vinId = quizQ.vin.id;
    setVinStats(prev => {
      const cur = prev[vinId] || { w: 0, c: 0 };
      return { ...prev, [vinId]: correct ? { ...cur, c: cur.c + 1 } : { ...cur, w: cur.w + 1 } };
    });
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => {
        const ns = s + 1;
        setBestStreak(b => Math.max(b, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
    if (!correct) setWrongVins(prev => [...prev, quizQ.vin]);
    setTimeout(() => {
      const nextDone = [...quizDone, quizQ.vin.id];
      const remaining = quizPool.filter(v => !nextDone.includes(v.id));
      if (remaining.length === 0) {
        setQuizDone(nextDone);
        updateDailyStreak();
        setScreen("results");
      } else {
        const next = remaining[0];
        setQuizQ(genQuestion(next, filteredVins));
        setQuizDone(nextDone);
        setChosen(null);
        setLastCorrect(null);
      }
    }, 1100);
  };

  const toggleCat = (c) => {
    setSelectedCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const activeVins = filteredVins;

  const totalAnswered = Object.values(vinStats).reduce((acc, v) => acc + v.w + v.c, 0);
  const masteredCount = Object.entries(vinStats).filter(([, v]) => v.c > 0 && v.w === 0).length;

  // ─── SCREENS ────────────────────────────────────────────────────────────────

  if (screen === "home") return (
    <div style={s}>
      <div style={{ padding: "32px 20px 16px", borderBottom: "1px solid #2A1A22", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#8A7060", textTransform: "uppercase", marginBottom: 6 }}>Bedeau · Formation</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#F0E8E0", lineHeight: 1.15 }}>Carte des vins</div>
          <div style={{ fontSize: 13, color: "#7A6B60", marginTop: 4 }}>{VINS.length} vins · fiches techniques</div>
        </div>
        {dailyStreak > 0 && (
          <div style={{ textAlign: "center", background: "#1E1008", border: "1px solid #C9A84C40", borderRadius: 12, padding: "10px 14px", flexShrink: 0 }}>
            <div style={{ fontSize: 22 }}>🔥</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#C9A84C" }}>{dailyStreak}</div>
            <div style={{ fontSize: 10, color: "#7A6B60" }}>{dailyStreak > 1 ? "jours" : "jour"}</div>
          </div>
        )}
      </div>

      <div style={{ padding: "20px 20px 8px" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A7060", textTransform: "uppercase", marginBottom: 12 }}>Filtrer par catégorie</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ALL_CATS.map(c => {
            const cfg = CAT_CONFIG[c];
            const active = selectedCats.includes(c);
            return (
              <button key={c} onClick={() => toggleCat(c)}
                style={{ background: active ? cfg.color : "#1E1018", color: active ? "#0A040A" : cfg.color, border: `1px solid ${cfg.color}40`, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: active ? 700 : 400, cursor: "pointer", transition: "all .15s" }}>
                {cfg.emoji} {cfg.short} <span style={{ opacity: .7 }}>({vinsBycat[c].length})</span>
              </button>
            );
          })}
        </div>
        {selectedCats.length > 0 && (
          <button onClick={() => setSelectedCats([])} style={{ marginTop: 8, fontSize: 11, color: "#7A6B60", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Tout sélectionner
          </button>
        )}
        <div style={{ marginTop: 12, fontSize: 12, color: "#7A6B60" }}>
          {selectedCats.length === 0 ? "Toute la carte sélectionnée" : `${activeVins.length} vins sélectionnés`}
        </div>
      </div>

      <div style={{ padding: "16px 20px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A7060", textTransform: "uppercase", marginBottom: 4 }}>Longueur de session</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[10, 25, 50, null].map(n => {
            const active = sessionLength === n;
            const label = n ? `${n} Q` : "Tout";
            const disabled = n && n > activeVins.length;
            return (
              <button key={String(n)} onClick={() => !disabled && setSessionLength(n)}
                style={{ flex: 1, padding: "10px 0", background: active ? "#C9A84C" : "#1E1018", border: `1px solid ${active ? "#C9A84C" : "#2A1A22"}`, borderRadius: 10, color: active ? "#0A040A" : disabled ? "#3A3030" : "#D0C8C0", fontSize: 13, fontWeight: active ? 700 : 400, cursor: disabled ? "default" : "pointer" }}>
                {label}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 11, color: "#5A4A50" }}>
          {sessionLength ? `${Math.min(sessionLength, activeVins.length)} questions · environ ${Math.ceil(Math.min(sessionLength, activeVins.length) * 0.3)} min` : `${activeVins.length} questions · session complète`}
        </div>

        <div style={{ fontSize: 11, letterSpacing: 2, color: "#8A7060", textTransform: "uppercase", marginTop: 4, marginBottom: 4 }}>Choisir un mode</div>

        <button onClick={() => startMode("flash")}
          style={{ background: "#1E1018", border: "1px solid #3A2030", borderRadius: 12, padding: "18px 20px", textAlign: "left", cursor: "pointer", color: "#F0E8E0" }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>📋 Fiches Flash</div>
          <div style={{ fontSize: 13, color: "#8A7060" }}>Révise les vins un à un — nom, cépages, profil, phrase de service</div>
        </button>

        <button onClick={() => startMode("quiz")}
          style={{ background: "#1E1018", border: "1px solid #3A2030", borderRadius: 12, padding: "18px 20px", textAlign: "left", cursor: "pointer", color: "#F0E8E0" }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>🎯 Quiz Sommelier</div>
          <div style={{ fontSize: 13, color: "#8A7060" }}>QCM sur les cépages, profils et origines — {activeVins.length} questions</div>
        </button>

        {weakVins.length > 0 && (
          <button onClick={() => startMode("weak")}
            style={{ background: "#1E0A0A", border: "1px solid #C44858", borderRadius: 12, padding: "18px 20px", textAlign: "left", cursor: "pointer", color: "#F0E8E0" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>📍 Points faibles <span style={{ fontSize: 14, color: "#C44858" }}>({weakVins.length})</span></div>
            <div style={{ fontSize: 13, color: "#8A7060" }}>Révise uniquement les vins que tu as ratés — triés par taux d'erreur</div>
          </button>
        )}

        {totalAnswered > 0 && (
          <div style={{ background: "#140A10", border: "1px solid #2A1A22", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "#7A6B60" }}>Progression globale</div>
            <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
              <span style={{ color: "#4CAF78" }}>✓ {masteredCount} maîtrisés</span>
              <span style={{ color: "#C44858" }}>✗ {weakVins.length} à revoir</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ─── FLASH CARDS ─────────────────────────────────────────────────────────────
  if (screen === "play" && mode === "flash") {
    const vin = flashVins[flashIdx];
    const cfg = CAT_CONFIG[vin.c] || { color: "#C9A84C", bg: "#1A1208" };
    return (
      <div style={s}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #2A1A22" }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#8A7060", fontSize: 22, cursor: "pointer" }}>←</button>
          <div style={{ fontSize: 12, color: "#7A6B60" }}>{flashIdx + 1} / {flashVins.length}</div>
          <div style={{ fontSize: 12, color: cfg.color }}>{CAT_CONFIG[vin.c]?.emoji} {CAT_CONFIG[vin.c]?.short}</div>
        </div>

        <div style={{ padding: "0 20px" }}>
          {/* Progress bar */}
          <div style={{ height: 3, background: "#2A1A22", borderRadius: 2, margin: "12px 0" }}>
            <div style={{ height: "100%", width: `${((flashIdx + 1) / flashVins.length) * 100}%`, background: cfg.color, borderRadius: 2, transition: "width .3s" }} />
          </div>

          {/* Card */}
          <div
            onClick={() => setFlashFlipped(f => !f)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(delta) > 50) { delta < 0 ? nextFlash() : prevFlash(); }
              else { setFlashFlipped(f => !f); }
              touchStartX.current = null;
            }}
            style={{ background: "#140A10", border: `1px solid ${cfg.color}30`, borderRadius: 16, minHeight: 340, padding: "24px 20px", cursor: "pointer", marginBottom: 16, position: "relative", userSelect: "none" }}>

            {!flashFlipped ? (
              <>
                <div style={{ fontSize: 11, letterSpacing: 2, color: cfg.color, textTransform: "uppercase", marginBottom: 12 }}>Pays · Origine</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#F0E8E0", lineHeight: 1.3, marginBottom: 8 }}>{vin.nom}</div>
                <div style={{ fontSize: 13, color: "#A09080", marginBottom: 16, lineHeight: 1.5 }}>{vin.n}</div>
                {vin.ca ? <div style={{ background: "#2A1408", border: "1px solid #8B4513", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#D4823A", marginBottom: 8 }}>À carafer avant service</div> : null}
                {vin.al ? <div style={{ background: "#201018", border: "1px solid #8B2030", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#C44858" }}>Attention — voir alertes</div> : null}
                <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 20px", fontSize: 11, color: "#4A3A40" }}>
                  <span>← swipe</span><span>Toucher pour retourner</span><span>swipe →</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 11, letterSpacing: 2, color: cfg.color, textTransform: "uppercase", marginBottom: 12 }}>Fiche technique</div>
                <div style={{ fontSize: 13, color: "#8A7060", marginBottom: 6, fontWeight: 600 }}>CÉPAGES</div>
                <div style={{ fontSize: 14, color: "#D0C8C0", marginBottom: 14, lineHeight: 1.5 }}>{vin.cp}</div>
                <div style={{ fontSize: 13, color: "#8A7060", marginBottom: 6, fontWeight: 600 }}>PROFIL</div>
                <div style={{ fontSize: 14, color: "#D0C8C0", marginBottom: 14, lineHeight: 1.5 }}>{vin.pr}</div>
                <div style={{ fontSize: 13, color: "#8A7060", marginBottom: 6, fontWeight: 600 }}>À DIRE AU CLIENT</div>
                <div style={{ fontSize: 14, color: cfg.color, lineHeight: 1.6, fontStyle: "italic" }}>{vin.ps}</div>
              </>
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={prevFlash} style={{ flex: 1, padding: "14px 0", background: "#1E1018", border: "1px solid #2A1A22", borderRadius: 10, color: "#A09080", fontSize: 18, cursor: "pointer" }}>←</button>
            <button onClick={() => setFlashFlipped(f => !f)}
              style={{ flex: 2, padding: "14px 0", background: flashFlipped ? cfg.color : "#1E1018", border: `1px solid ${cfg.color}40`, borderRadius: 10, color: flashFlipped ? "#0A040A" : cfg.color, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {flashFlipped ? "Voir recto" : "Voir la fiche"}
            </button>
            <button onClick={nextFlash} style={{ flex: 1, padding: "14px 0", background: "#1E1018", border: "1px solid #2A1A22", borderRadius: 10, color: "#A09080", fontSize: 18, cursor: "pointer" }}>→</button>
          </div>
        </div>
      </div>
    );
  }

  // ─── QUIZ ────────────────────────────────────────────────────────────────────
  if (screen === "play" && mode === "quiz" && quizQ) {
    const total = filteredVins.length;
    const answered = quizDone.length;
    const cfg = CAT_CONFIG[quizQ.vin.c] || { color: "#C9A84C" };
    const types = { profil: "Identifie le vin", cepage: "Identifie les cépages", pays: "Identifie le pays" };

    return (
      <div style={s}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #2A1A22" }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#8A7060", fontSize: 22, cursor: "pointer" }}>✕</button>
          <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
            <span style={{ color: "#4CAF78" }}>✓ {score}</span>
            {streak >= 2 && <span style={{ color: "#C9A84C" }}>🔥 {streak}</span>}
          </div>
          <div style={{ fontSize: 12, color: "#7A6B60" }}>{answered + 1}/{total}</div>
        </div>

        <div style={{ height: 4, background: "#2A1A22" }}>
          <div style={{ height: "100%", width: `${(answered / total) * 100}%`, background: "#4CAF78", transition: "width .3s" }} />
        </div>

        <div style={{ padding: "20px 20px 8px" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: weakMode ? "#C44858" : cfg.color, textTransform: "uppercase", marginBottom: 10 }}>
            {weakMode ? "📍 Points faibles · " : `${cfg.emoji} ${CAT_CONFIG[quizQ.vin.c]?.short} · `}{types[quizQ.type] || "Quiz"}
          </div>
          <div style={{ fontSize: 16, color: "#F0E8E0", lineHeight: 1.6, minHeight: 90, whiteSpace: "pre-line" }}>{quizQ.question}</div>
        </div>

        <div style={{ padding: "8px 20px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
          {quizQ.options.map(opt => {
            let bg = "#1E1018";
            let border = "1px solid #2A1A22";
            let color = "#D0C8C0";
            if (chosen) {
              if (opt === quizQ.reponse) { bg = "#0A2010"; border = "1px solid #4CAF78"; color = "#4CAF78"; }
              else if (opt === chosen) { bg = "#200A10"; border = "1px solid #C44858"; color = "#C44858"; }
              else { color = "#4A3A40"; }
            }
            return (
              <button key={opt} onClick={() => handleAnswer(opt)}
                style={{ background: bg, border, borderRadius: 10, padding: "14px 16px", textAlign: "left", cursor: chosen ? "default" : "pointer", color, fontSize: 14, lineHeight: 1.4, transition: "all .2s" }}>
                {opt}
              </button>
            );
          })}
        </div>

        {chosen && lastCorrect !== null && (
          <div style={{ padding: "0 20px 20px" }}>
            <div style={{ background: lastCorrect ? "#0A2010" : "#200A10", border: `1px solid ${lastCorrect ? "#4CAF78" : "#C44858"}`, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: lastCorrect ? "#4CAF78" : "#C44858" }}>
              {lastCorrect ? (streak >= 3 ? `🔥 ${streak} en série !` : "Bonne réponse !") : `Réponse : ${quizQ.reponse}`}
            </div>
            {!lastCorrect && quizQ.vin.ps && (
              <div style={{ marginTop: 8, fontSize: 12, color: "#8A7060", fontStyle: "italic", lineHeight: 1.5 }}>
                "{quizQ.vin.ps}"
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── RÉSULTATS ───────────────────────────────────────────────────────────────
  if (screen === "results") {
    const total = filteredVins.length;
    const pct = Math.round((score / total) * 100);
    const badge = pct >= 90 ? "🏆 Expert" : pct >= 70 ? "🎯 Confirmé" : pct >= 50 ? "📚 Apprenti" : "🌱 Débutant";
    return (
      <div style={s}>
        <div style={{ padding: "48px 20px 0", textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "🎯" : "📚"}</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#C9A84C", marginBottom: 4 }}>{score}/{total}</div>
          <div style={{ fontSize: 14, color: "#8A7060", marginBottom: 4 }}>{pct}% de bonnes réponses</div>
          <div style={{ fontSize: 16, color: "#F0E8E0", marginBottom: 32 }}>{badge}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            <div style={{ background: "#1E1018", borderRadius: 12, padding: "16px 12px" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#4CAF78" }}>{score}</div>
              <div style={{ fontSize: 12, color: "#7A6B60", marginTop: 2 }}>Bonnes réponses</div>
            </div>
            <div style={{ background: "#1E1018", borderRadius: 12, padding: "16px 12px" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#C9A84C" }}>{bestStreak}</div>
              <div style={{ fontSize: 12, color: "#7A6B60", marginTop: 2 }}>Meilleure série</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 32 }}>
            <button onClick={() => startMode("quiz")}
              style={{ padding: "16px", background: "#C9A84C", border: "none", borderRadius: 12, color: "#0A040A", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Rejouer
            </button>
            <button onClick={() => startMode("flash")}
              style={{ padding: "16px", background: "#1E1018", border: "1px solid #2A1A22", borderRadius: 12, color: "#D0C8C0", fontSize: 14, cursor: "pointer" }}>
              Réviser en fiches flash
            </button>
            <button onClick={() => setScreen("home")}
              style={{ padding: "16px", background: "none", border: "none", color: "#7A6B60", fontSize: 13, cursor: "pointer" }}>
              Changer de catégorie
            </button>
          </div>

          {wrongVins.length > 0 && (
            <div style={{ padding: "0 20px 40px" }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#C44858", textTransform: "uppercase", marginBottom: 12 }}>
                À revoir · {wrongVins.length} vin{wrongVins.length > 1 ? "s" : ""}
              </div>
              {wrongVins.map(v => {
                const cfg = CAT_CONFIG[v.c] || { color: "#C9A84C" };
                return (
                  <div key={v.id} style={{ background: "#140A10", border: `1px solid ${cfg.color}25`, borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#F0E8E0" }}>{v.nom}</div>
                      <div style={{ fontSize: 11, color: cfg.color }}>{cfg.emoji} {CAT_CONFIG[v.c]?.short}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#8A7060", marginBottom: 4 }}>{v.cp}</div>
                    <div style={{ fontSize: 12, color: "#A09080", lineHeight: 1.5 }}>{v.pr}</div>
                    <div style={{ fontSize: 12, color: cfg.color, fontStyle: "italic", marginTop: 8, lineHeight: 1.5 }}>{v.ps}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
