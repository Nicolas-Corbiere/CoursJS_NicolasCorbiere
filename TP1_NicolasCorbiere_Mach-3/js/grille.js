/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
class Grille {

  constructor(l, c) {
    this.nbLignes = l;
    this.nbColonnes = c;
    this.tabCookies = []
    this.cookieSelect1 = null;
    this.cookieSelect2 = null;
    this.nbDeCookiesDifferents = 3;
    this.score = 0;
    this.remplirTableauDeCookies(this.nbDeCookiesDifferents);

  }

  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    caseDivs.forEach((div, index) => {
      let ligne = Math.floor(index / this.nbColonnes);
      let colonne = index % this.nbColonnes;

      console.log("On remplit le div index=" + index + " l=" + ligne + " col=" + colonne);

      let img = this.tabCookies[ligne][colonne].htmlImage;

      // ----- DetectionMatch

      this.detecterMatch3(ligne, colonne);

      // ----- Evt onclick

      eventOnClick(grille, img)

      // ----- Evt Drag'n Drop

      this.eventsDragAndDrop(img);

      // on affiche l'image dans le div pour la faire apparaitre à l'écran.
      div.appendChild(img);

    });


    this.gestionDetectionChuteEtRemplacement();

  }


  // --- Evenement Drag and drop --- 
  eventsDragAndDrop(img) {

    eventOndragstart(this, img);

    eventOndragenter(this, img);

    eventOndragover(img);

    eventOndragleave(this, img);

    eventOnDrop(this, img);

  }

  // --- SWAP cookie ---

  swap_possible(cookie1, cookie2) {
    if (Cookie.distance(cookie1, cookie2) === 1) {
      return true;
    }
    else {
      return false;
    }
  }


  swap() {
    if (this.swap_possible(this.cookieSelect1, this.cookieSelect2)) {
      console.log("Swap possible !");
      Cookie.swapCookies(this.cookieSelect1, this.cookieSelect2);
      this.deselecteCookie();
    }
    else {
      console.log("Swap impossible !");
      this.deselecteCookie();
    }

    this.gestionDetectionChuteEtRemplacement();

  }

  gestionDetectionChuteEtRemplacement() {

    while (this.detecterMatch()) {
      this.gestionChute();
      this.remplacementCookie();
    }

    this.gestionChute();
    this.remplacementCookie();
  }


  swapTwoCookie(c1, c2) {
    Cookie.swapCookies(c1, c2);
  }

  // --- SELECT et DESELECT cookie ---

  selectCookie(ligne, colonne) {
    if (this.cookieSelect1 == null) {
      console.log("Cookie 1");
      return this.cookieSelect1 = this.getCookieDepuisLC(ligne, colonne);
    }
    else if (this.cookieSelect2 == null) {
      console.log("Cookie 2");
      return this.cookieSelect2 = this.getCookieDepuisLC(ligne, colonne);
    }
    //le else n'ai pas utile 
    /*else {
      console.log("Cookie 1");
      this.deselecteCookie();
      return this.cookieSelect1 = this.getCookieDepuisLC(ligne, colonne)
    }*/
  }

  deselecteCookie() {
    this.cookieSelect1.deselectionnee();
    this.cookieSelect1 = null;
    this.cookieSelect2.deselectionnee();
    this.cookieSelect2 = null;
  }

  // --- Detection des Match ---

  detecterMatch() {
    let bool = false;
    for (let i = 0; i < this.nbColonnes; i++) {
      for (let j = 0; j < this.nbLignes; j++) {
        let retour = this.detecterMatch3(i, j);
        if (!bool && retour) {
          bool = true;
        }

      }
    }
    return bool;

  }

  detecterMatch3(ligne, colonne) {
    return this.detecterMatch3Lignes(ligne, colonne) || this.detecterMatch3Colonnes(ligne, colonne);


  }

  detecterMatch3Lignes(ligne, colonne) {
    let currentCookie = this.getCookieDepuisLC(ligne, colonne);

    if (currentCookie.colonne < this.nbColonnes - 2) {
      let currentCookiePlus1 = this.getCookieDepuisLC(ligne, colonne + 1);
      let currentCookiePlus2 = this.getCookieDepuisLC(ligne, colonne + 2);
      let boolVerifType = currentCookie.type === currentCookiePlus1.type && currentCookie.type === currentCookiePlus2.type;
      let boolVeriftoDelete = !currentCookie.toDelete || !currentCookiePlus1.toDelete || !currentCookiePlus1.toDelete;
      if (boolVerifType && boolVeriftoDelete) {
        this.deleteCookie(currentCookie);
        this.deleteCookie(currentCookiePlus1);
        this.deleteCookie(currentCookiePlus2);
        //console.log("detecterMatch3Lignes : ( " + ligne + ", " + colonne + ") : "  + true)
        return true;


      }
    }
    //console.log("detecterMatch3Lignes : " + false)

    return false;

  }


  detecterMatch3Colonnes(ligne, colonne) {
    let currentCookie = this.getCookieDepuisLC(ligne, colonne);

    if (ligne < this.nbLignes - 2) {
      let currentCookiePlus1 = this.getCookieDepuisLC(ligne + 1, colonne);
      let currentCookiePlus2 = this.getCookieDepuisLC(ligne + 2, colonne);
      let boolVerifType = currentCookie.type === currentCookiePlus1.type && currentCookie.type === currentCookiePlus2.type;
      let boolVeriftoDelete = !currentCookie.toDelete || !currentCookiePlus1.toDelete || !currentCookiePlus1.toDelete;

      if (boolVerifType && boolVeriftoDelete) {
        this.deleteCookie(currentCookie);
        this.deleteCookie(currentCookiePlus1);
        this.deleteCookie(currentCookiePlus2)
        //console.log("detecterMatch3Colonnes : ( " + ligne + ", " + colonne + ") : "  + true)
        return true;
      }
    }
    //console.log("detecterMatch3Colonnes : " + false)
    return false;
  }

  // --- Supprimer cookie --- 

  deleteCookie(cookieToRm) {
    cookieToRm.aSupprimer();
    cookieToRm.changeIMGtoVoid();
    this.score += 0.5;

    this.actualiserScore();
  }

  actualiserScore() {
    let scoreDivs = document.querySelectorAll("#score");
    scoreDivs[0].innerHTML = "Score : " + Math.round(this.score);
  }

  // --- Chute ---

  gestionChute() {
    // parcour de chaque collone 
    for (let indexColonne = 0; indexColonne < this.nbColonnes; indexColonne++) {
      // parcour de chaque ligne de bas en haut 
      for (let indexLigne = this.nbLignes - 1; indexLigne != -1; indexLigne--) {
        // si la case est vide, alors j'échange le cookie a supprimer avec le premier cookie disponible dans la colonne
        this.searchCookieToDelet(indexLigne, indexColonne);

      }

      //pour stoper l'animation
      //let animeId = setInterval(gestionChute,300);
      //pour stoper l'animation
      //clearInterval(animeId);

    }


  }

  // je regarde si le cookie est a supprimer, si c'est le cas je l'échange avec le premier cookie disponible dans la colonne
  searchCookieToDelet(ligne, colonne) {
    let currentCookie = this.getCookieDepuisLC(ligne, colonne);
    if (ligne > 0 && currentCookie.toDelete) {
      let ligneFirstDispo = this.premierCookieDispo(ligne - 1, colonne);
      if (ligneFirstDispo !== null) {
        this.swapTwoCookie(currentCookie, this.getCookieDepuisLC(ligneFirstDispo, colonne));
      }
    }

  }

  //Je cherche le premier cookie qui n'ai pas a supprimer dans la colonne 
  premierCookieDispo(ligne, colonne) {
    let currentCookie = this.getCookieDepuisLC(ligne, colonne);
    if (ligne < 0) {
      return null;
    }
    if (ligne >= 0 && !currentCookie.toDelete) {
      console.log("Premier a être dipso :")
      console.log("ligne : " + ligne + " colonne : " + colonne);
      return ligne;
    }
    else {
      return this.premierCookieDispo(ligne - 1, colonne);
    }

  }

  // Je parcours tout les cookie et je regarde si ils sont a supprimer, si c'est le cas, je le remplace par un nouveau cookie
  remplacementCookie() {
    for (let i = 0; i < this.nbColonnes; i++) {
      for (let j = 0; j < this.nbLignes; j++) {
        let currentCookie = this.getCookieDepuisLC(i, j);
        if (currentCookie.toDelete) {
          currentCookie.type = Math.floor(Math.random() * this.nbDeCookiesDifferents);
          currentCookie.takeNormalImg();
          currentCookie.deselectionnee();
          currentCookie.pasSupprimer();
        }
      }
    }

  }





  // --- AUTRES --- 

  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    this.tabCookies = create2DArray(this.nbLignes);

    for (let i = 0; i < this.nbColonnes; i++) {
      for (let j = 0; j < this.nbLignes; j++) {
        let type = Math.floor(Math.random() * this.nbDeCookiesDifferents);
        console.log("type : " + type + "(" + i + "," + j + ")");
        let cookie = new Cookie(type, i, j);
        this.tabCookies[i][j] = cookie;
      }
    }
  }

  getCookieDepuisLC(ligne, colonne) {
    if (ligne >= 0 && ligne < this.nbLignes && colonne >= 0 && colonne < this.nbColonnes) {

      return this.tabCookies[ligne][colonne];
    }


  }



}


