<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="headline"> Gestionnaire des visites </v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-subheader>Visites</v-subheader>
            <v-container v-if="visite_mode">
              <v-row justify="space-between" align="flex-start">
                <v-col cols="3">
                  <v-list-item-group v-model="selectedItem" color="primary">
                    <v-list-item v-for="(visite, i) of visites" :key="i">
                      <v-list-item-content
                        @click="
                          selectedCard && selectedCard == visite
                            ? closeCard()
                            : showInfo(visite)
                        "
                      >
                        <v-list-item-title
                          v-text="visite.ref"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-col>
                <v-col cols="8">
                  <v-card v-if="selectedCard">
                    <v-card-title class="headline" justify="center"
                      >{{ selectedCard.ref }}
                    </v-card-title>

                    <v-card-text>
                      <p>Date de la visite : {{ selectedCard.dateVisite }}</p>
                      <p>Compte Rendue : {{ selectedCard.cr }}</p>
                      <p>Nourriture : {{ selectedCard.nourriture }}</p>
                      <p>Ponte jour : {{ selectedCard.ponteJour }}</p>
                      <p>
                        Presence Compte Rendue : {{ selectedCard.presenceCR }}
                      </p>
                      <p>
                        Force de la colonie : {{ selectedCard.forceColonie }}
                      </p>
                      <p>Comportement : {{ selectedCard.comportement }}</p>
                      <p>Taille Couvain : {{ selectedCard.tailleCouvain }}</p>
                      <p>Nombre de Varoa : {{ selectedCard.nbrVaroa }}</p>
                      <p>Commentaire: {{ selectedCard.commentaire }}</p>
                      <p>
                        Action À Réaliser : {{ selectedCard.actionRealisee }}
                      </p>
                      <p>Action Prévue : {{ selectedCard.actionPrevue }}</p>
                      <p>État ruche : {{ selectedCard.etatRuche }}</p>
                      <p>Poids : {{ selectedCard.poids }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="!visite_mode">
              <v-card-text>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      label="Nourriture"
                      v-model="visite.nourriture"
                      placeholder="Ecrivez Votre Compte Rendue "
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visite.ponteJour"
                      label="Ponte Jour"
                      hint="Ponte Jour"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visite.presenceCR"
                      label="Presence De Cellule de Reine"
                      hint="Presence De Cellule de Reine"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visite.forceColonie"
                      label="Force De la Colonie"
                      hint="Force De la Colonie"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="date"
                      v-model="visite.dateVisite"
                      label="Date de la visite"
                      hint="JJ/MM/AAAA"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visite.etatRuche"
                      label="État de ruches"
                      hint="État de ruches"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visite.poids"
                      label="Poids"
                      hint="poids "
                      outlined
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visite.comportement"
                      label="Comportement"
                      hint="Comportement"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visite.tailleCouvain"
                      label="Taille Couvain"
                      hint="Taille Couvain "
                      outlined
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visite.nbrVaroa"
                      label="Nombre de Varoa"
                      hint="Nombre de Varoa"
                      outlined
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visite.actionRealisee"
                      label="Action Réalisé"
                      hint="Action Réalisé "
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visite.actionPrevue"
                      label="Action à Prévoir"
                      hint="Action à Prévoir"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="rucher_id"
                      :items="ruchers"
                      label="Rucher"
                      clearable
                      deletable-chips
                      solo
                      required
                      item-value="_id"
                      item-text="ref"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="visite.ruches"
                      :items="ruches"
                      label="Ruches"
                      clearable
                      deletable-chips
                      solo
                      multiple
                      required
                      item-value="_id"
                      item-text="ref"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      type="text"
                      label="Compte rendu"
                      v-model="visite.cr"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      type="text"
                      label="Commentaire"
                      v-model="visite.commentaire"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="visite_mode = true">
                  Fermer
                </v-btn>
              </v-card-actions>
            </v-container>

            <v-card v-if="selectedItem != null">
              <!-- <v-card-title class="headline">
                {{ items[selectedItem].text }}
              </v-card-title> -->
            </v-card>
            <v-spacer />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="!visite_mode ? addVisite() : switch_mode()"
          >
            {{ visite_mode ? "Ajouter Visite" : "Enregistrer Votre Visite" }}
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "users",
  name: "Visits",
  layout: "connected",
  mounted() {
    this.getAllVisits();
    this.getAllRuchers();
  },
  watch: {
    rucher_id(val) {
      if (val) this.getRuches();
      else {
        this.ruches = [];
        this.ruche_id = "";
      }
    },
  },
  data() {
    return {
      selectedCard: null,
      selectedItem: null,
      visite_mode: true,
      rucher_id: "",
      ruche_id: "",
      visites: [],
      ruchers: [],
      ruches: [],
      visite: {
        dateVisite: null,
        cr: "",
        nourriture: "",
        ponteJour: "",
        presenceCR: "",
        forceColonie: null,
        comportement: "",
        tailleCouvain: null,
        nbrVaroa: null,
        commentaire: "",
        actionRealisee: "",
        actionPrevue: "",
        etatRuche: "",
        poids: null,
        rucher: null,
        ruches: [],
      },
      erroMessage: "",
      rules: {
        string: [
          (value) => (value || "").trim().length || "Champ obligatoire !",
        ],
        number: [
          (value) => (value || "").trim().length || "Champ obligatoire !",
          (value) => value >= 0 || "Le nombre doit être positive",
        ],
      },
    };
  },
  methods: {
    showInfo(visite) {
      this.selectedCard = visite;
    },
    closeCard() {
      this.selectedCard = null;
    },
    getAllVisits() {
      this.$get("/visites")
        .then((res) => {
          if (res.data.success) {
            this.visites = res.data.visites;
          } else
            this.$notify({
              label: "Erreur",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllRuchers() {
      this.$get("/ruchers")
        .then((res) => {
          if (res.data.success) {
            this.ruchers = res.data.ruchers;
          } else
            this.$notify({
              label: "Erreur",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRuches() {
      // Search with the query (where ref like this.rucher_id)
      this.$get(`/ruches?rucher_id=${this.rucher_id}`)
        .then((res) => {
          this.ruches = res.data.ruches;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addVisite() {
      this.visite.rucher = this.rucher_id;
      console.log(this.visite);
      this.$post("/visite", this.visite)
        .then((res) => {
          this.getAllVisits();
          this.visite_mode = !this.visite_mode;
          this.resetInputs();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            label: "Erreur",
            text: err,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    resetInputs() {
      this.visite = {
        dateVisite: "",
        cr: "",
        nourriture: "",
        ponteJour: "",
        presenceCR: "",
        comportement: "",
        tailleCouvain: "",
        nbrVaroa: "",
        commentaire: "",
        actionRealisee: "",
        actionPrevue: "",
        etatRuche: "",
        poids: "",
        rucher: "",
        ruches: [],
      };
    },
    // checkInputs() {
    //   let validForm = true;
    //   this.erroMessage = "";
    //   // check this.visite inputs
    //   console.log(typeof this.visite.dateVisite != "date");
    //   // if(typeof this.visite.dateVisite != "date"){
    //   //  validForm = false
    //   // }
    //   if (
    //     !this.varname.length ||
    //     (this.varname.length && !this.varname.trim().length)
    //   ) {
    //     // string vars
    //     validForm = false;
    //   }

    //   if (!validForm) this.showError();
    // },
    // showError() {
    //   this.erroMessage = "Vous avez rentré des valeurs incorrecte !";
    // },
    switch_mode() {
      this.visite_mode = !this.visite_mode;
    },
  },
};
</script>
