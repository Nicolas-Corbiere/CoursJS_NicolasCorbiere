function eventOnClick(grille, img) {
    img.onclick = (evt) => {
        //console.log("Image cliqué");
        //console.log(imgL);
        //console.log(imgC);

        let cookieSelect = grille.selectCookie(evt.target.dataset.data_ligne, evt.target.dataset.data_colonne);

        if (!cookieSelect.toDelete) {
            cookieSelect.afficheCookie();

            cookieSelect.selectionnee();

            //si cookieSelect2 n'est pas null, alors cookieSelect1 et cookieSelect2 sont selectionner 
            //Je vais donc voir si je peux swap
            if (grille.cookieSelect2 != null) {
                grille.swap();
            }
        }

    }
}

function eventOndragstart(grille, img) {
    img.ondragstart = (evt) => {

        let imgClick = evt.target;
        let imgL = imgClick.dataset.data_ligne;
        let imgC = imgClick.dataset.data_colonne;
        grille.cookieSelect1 = grille.getCookieDepuisLC(imgL, imgC);

        grille.cookieSelect1.afficheCookie();
        grille.cookieSelect1.selectionnee();


    }
}

function eventOndragleave(grille, img) {
    img.ondragleave = (evt) => {

        let imgClick = evt.target;
        let imgL = imgClick.dataset.data_ligne;
        let imgC = imgClick.dataset.data_colonne;
        let tmpCookie = grille.getCookieDepuisLC(imgL, imgC);

        tmpCookie.deselectionneeDrag();

        if (tmpCookie !== grille.cookieSelect1) {
            tmpCookie.deselectionnee();
        }

    }
}

function eventOnDrop(grille, img) {

    img.ondrop = (evt) => {

        let imgClick = evt.target;
        let imgL = imgClick.dataset.data_ligne;
        let imgC = imgClick.dataset.data_colonne;
        grille.cookieSelect2 = grille.getCookieDepuisLC(imgL, imgC);

        grille.cookieSelect2.afficheCookie();
        grille.cookieSelect2.deselectionneeDrag();

        grille.swap();
    }
}

function eventOndragenter(grille, img) {
    img.ondragenter = (evt) => {
        let imgClick = evt.target;
        let imgL = imgClick.dataset.data_ligne;
        let imgC = imgClick.dataset.data_colonne;
        let tmpCookie = grille.getCookieDepuisLC(imgL, imgC);

        // Si le swap est possible, alors j'ajoute la classe "grilleDragOver" 
        if (grille.swap_possible(grille.cookieSelect1, tmpCookie)) {
            tmpCookie.selectionneeDrag();
            tmpCookie.selectionnee();
        }


    }
}

function eventOndragover(img) {
    img.ondragover = (evt) => {
        evt.preventDefault();
    }

}
