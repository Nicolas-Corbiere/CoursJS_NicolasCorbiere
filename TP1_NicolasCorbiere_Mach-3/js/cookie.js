class Cookie {

  static urlsImagesNormales = [
    "./assets/images/Croissant@2x.png",
    "./assets/images/Cupcake@2x.png",
    "./assets/images/Danish@2x.png",
    "./assets/images/Donut@2x.png",
    "./assets/images/Macaroon@2x.png",
    "./assets/images/SugarCookie@2x.png",
  ];
  static urlsImagesSurlignees = [
    "./assets/images/Croissant-Highlighted@2x.png",
    "./assets/images/Cupcake-Highlighted@2x.png",
    "./assets/images/Danish-Highlighted@2x.png",
    "./assets/images/Donut-Highlighted@2x.png",
    "./assets/images/Macaroon-Highlighted@2x.png",
    "./assets/images/SugarCookie-Highlighted@2x.png",
  ];

  constructor(type, ligne, colonne) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;
    this.toDelete = false;

    this.htmlImage = document.createElement("img");
    this.htmlImage.src=Cookie.urlsImagesNormales[type];
    this.htmlImage.height = 80;
    this.htmlImage.width= 80;
    this.htmlImage.dataset.data_colonne = colonne;
    this.htmlImage.dataset.data_ligne = ligne;
    this.htmlImage.classList.add("cookies");
    // document.body.append("You selected: " + listOfSelectedValues);
  }

  // --- Méthode ---

  static swapCookies(c1, c2) {
    // On échange leurs images et types
    // et on les désélectionne

    let tmpType = c1.type;
    let tmpToDelet = c1.toDelete;
    let tmpHtmlImageIrl = c1.htmlImage.src;

    c1.type = c2.type;
    c1.toDelete = c2.toDelete;
    c1.htmlImage.src=c2.htmlImage.src;

    c2.type = tmpType;
    c2.toDelete = tmpToDelet;
    c2.htmlImage.src=tmpHtmlImageIrl;
    
  }

  /** renvoie la distance entre deux cookies */
  static distance(cookie1, cookie2) {
    let l1 = cookie1.ligne;
    let c1 = cookie1.colonne;
    let l2 = cookie2.ligne;
    let c2 = cookie2.colonne;

    const distance = Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
    //console.log("Distance = " + distance);
    return distance;
  }

  afficheCookie() {
    console.log("Ligne : " + this.ligne + " Colonne : " + this.colonne + " Type du cookie : " + this.type + " a supprimer : " + this.toDelete);
  }

  // --- Modification d'attribut ---

  aSupprimer(){
    this.toDelete = true;
  }

  pasSupprimer(){
    this.toDelete = false;
  }
  changeIMGtoVoid(){
    this.htmlImage.src="./assets/images/Tile@2x.png";
    //this.htmlImage.classList.add("cookie-cachee");
  }

  takeNormalImg(){
    this.htmlImage.src=Cookie.urlsImagesSurlignees[this.type];
  }

  // --- Changement de Style ---

  selectionnee() {
    this.htmlImage.src=Cookie.urlsImagesSurlignees[this.type];
    this.htmlImage.classList.add("cookies-selected");
  }

  deselectionnee() {
    this.htmlImage.src=Cookie.urlsImagesNormales[this.type];
    this.htmlImage.classList.remove("cookies-selected");
  }

  selectionneeDrag() {
    this.htmlImage.classList.add("grilleDragOver");

  }

  deselectionneeDrag() {
    this.htmlImage.classList.remove("grilleDragOver");
  }

  

}
