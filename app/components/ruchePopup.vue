<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step @click="step = 1" :complete="step > 1" step="1">
          Ruche
        </v-stepper-step>
        <v-stepper-step @click="go_to(2)" :complete="step > 2" step="2">
          Cadre(s)
        </v-stepper-step>
        <v-stepper-step @click="go_to(3)" :complete="step > 3" step="3">
          Reine
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="ruche_info" @submit.prevent>
            <v-card>
              <v-row>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="ruche.feedName"
                    :items="feedList"
                    label="Nom sigfox"
                    clearable
                    deletable-chips
                    solo
                  ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Type de la ruche"
                    v-model="ruche.typeRuche"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="date"
                    label="Début de service"
                    v-model="ruche.debutService"
                    :rules="rules.date"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Hausse"
                    v-model="ruche.hausse"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Grille de la reine"
                    v-model="ruche.grilleReine"
                    outlined
                    :rules="rules.string"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Plaque de Font"
                    v-model="ruche.plaqueFont"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Nourrisseur"
                    v-model="ruche.nourrisseur"
                    outlined
                    :rules="rules.string"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="cadre_info" @submit.prevent>
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Ajouter un cadre
                </v-btn>
              </template>
              <v-card>
                <cadrePopup :cadre="cadre" />
                <v-card-action>
                  <v-btn color="primary" text @click="addCadre()">
                    Enregistrer Votre Cadre
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    Fermer
                  </v-btn>
                </v-card-action>
              </v-card>
            </v-dialog>
            <v-container>
              <v-list rounded>
                <v-subheader>Le(s) cadre(s) de votre ruche</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item v-for="(cadre, i) in ruche.cadres" :key="i">
                    <v-list-item-content justify="center">
                      <v-list-item-title>Cadre {{ i }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Date de dépôt : ${cadre.dateDepot}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        >Ciré : ${cadre.ciree}</v-list-item-subtitle
                      ><v-list-item-subtitle
                        >Miel : ${cadre.miel}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Pollen : ${cadre.pollen}</v-list-item-subtitle
                      ><v-list-item-subtitle
                        >Couvain : ${cadre.couvain}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >État du Cadre :
                        ${cadre.etatCadre}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        @click="removeCadre(i)"
                        ><v-icon dark> mdi-minus </v-icon></v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-form ref="reine_info" @submit.prevent>
            <v-card>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Code Génétique"
                    v-model="ruche.reine.codeGen"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Marqué"
                    v-model="ruche.reine.marquee"
                    outlined
                    :rules="rules.string"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Clipé"
                    v-model="ruche.reine.clippe"
                    outlined
                    required
                    :rules="rules.string"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="date"
                    label="Date De Naissance"
                    v-model="ruche.reine.dateNaissance"
                    outlined
                    :rules="rules.date"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn color="primary" text @click="addRuche()">
                Enregistrz Votre Ruche
              </v-btn>
            </v-card>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import hives from "../pages/hives.vue";
export default {
  props: ["rucher", "ruche", "feedList"],
  data() {
    return {
      selectedItem: "",
      dialog: false,
      step: 1,
      cadre: {
        dateDepot: null,
        ciree: "",
        miel: "",
        pollen: "",
        couvain: "",
        etatCadre: "",
      },
      rules: {
        date: [(value) => !!value || "Champ Obligatoire !"],
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
    addRuche() {
      this.ruche.rucher = this.rucher;
      this.$post("/ruche", this.ruche)
        .then((res) => {
          if (res.data.success) {
            this.dialog = false;
            console.log("hana");
            this.resetInputs();
            this.$notify({
              text: res.data.message,
              type: "success",
              showAnimation: "slideDown",
            });
          } else
            this.$notify({
              label: "Erreur",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
        })
        .catch((err) => {
          this.$notify({
            label: "Erreur",
            text: err,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    addCadre() {
      this.ruche.cadres.push(this.cadre);
      this.resetCadreInputs();
      this.dialog = false;
    },
    removeCadre(index) {
      this.ruche.cadres.splice(index, 1);
    },
    resetInputs() {
      this.ruche = {
        reine: {
          codeGen: "",
          marquee: "",
          clippe: "",
          dateNaissance: null,
        },
        cadres: [],
        typeRuche: "",
        rucher: "",
        debutService: null,
        hausse: "",
        grilleReine: "",
        plaqueFont: "",
        nourrisseur: "",
      };
    },
    resetCadreInputs() {
      this.cadre = {
        dateDepot: null,
        ciree: "",
        miel: "",
        pollen: "",
        couvain: "",
        etatCadre: "",
      };
    },
    go_to(val) {
      if (val == 2) {
        if (this.$refs.ruche_info.validate()) {
          this.step = val;
        } else
          this.$notify({
            label: "Erreur",
            text: "Vous n'avez pas rempli tous les Champs !",
            type: "error",
            showAnimation: "slideDown",
          });
      } else if (val == 3) {
        if (this.ruche.cadres.length) {
          this.step = val;
        } else
          this.$notify({
            label: "Erreur",
            text: "Vous n'avez pas rempli tous les Champs !",
            type: "error",
            showAnimation: "slideDown",
          });
      }
    },
    // this.$refs.ruche_info.validate()
  },
};
</script>
