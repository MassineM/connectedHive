<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline"> Gestionnaire des ruches </v-card-title>
        <v-card-text>
          <p>Ajouter le tableau de navigation ici</p>
          <p>Ruchers sous forme de Dossier/</p>
          <p>Ruches sous forme de ./Fichier/Reine</p>
          <div v-if="selected_rucher"></div>
        </v-card-text>
        <v-card-actions>
          <v-col cols="4">
            <v-row class="pb-4">
              <v-dialog v-model="dialogRucher" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Ajouter un rucher
                  </v-btn>
                </template>
                <v-card>
                  <rucherPopup :rucher="rucher" />
                  <v-card-action>
                    <v-btn color="primary" text @click="addRucher()">
                      Enregistrer Votre Rucher
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialogRucher = false">
                      Fermer
                    </v-btn>
                  </v-card-action>
                </v-card>
              </v-dialog>
            </v-row>
            <v-row>
              <v-subheader>Ruchers</v-subheader>
            </v-row>
            <v-row>
              <v-treeview
                outlined
                :items="items"
                item-key="name"
                return_object
                dense
              >
                <!-- @update:active="activatedNode"
            @update:open="openedNodes" -->
                <template v-slot:prepend="{ item }">
                  <v-icon
                    class="mx-1"
                    small
                    @click="
                      item.name.includes('EN')
                        ? setSelectedRucher(item)
                        : item.name.includes('RU')
                        ? setSelectedRuche(item)
                        : setSelectedCadre(item)
                    "
                    >mdi-eye
                  </v-icon>
                </template>
              </v-treeview>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-card v-if="selected_rucher">
              <v-card-title class="headline" justify="center"
                >{{ selected_rucher.ref }}
              </v-card-title>
              <v-card-text>
                <p>
                  Localisation du rucher : {{ selected_rucher.localisation }}
                </p>
              </v-card-text>
              <v-dialog v-model="dialogRuche" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Ajouter une ruche
                  </v-btn>
                </template>
                <v-card>
                  <ruchePopup
                    :rucher="selected_rucher._id"
                    :ruche="ruche"
                    :feedList="feedList"
                  />

                  <v-btn color="primary" text @click="closeRuche()">
                    Fermer
                  </v-btn>
                </v-card>
              </v-dialog>
              <v-btn
                color="primary"
                @click="supprimerRucher(selected_rucher._id)"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Supprimer
              </v-btn>
            </v-card>
            <v-card v-else-if="selected_ruche">
              <v-card-title class="headline" justify="center"
                >{{ selected_ruche.ref }}
              </v-card-title>
              <v-card-text>
                <p>Type de la ruche : {{ selected_ruche.typeRuche }}</p>
                <p>Début de service : {{ selected_ruche.debutService }}</p>
                <p>Hausse : {{ selected_ruche.hausse }}</p>
                <p>Grille de la reine : {{ selected_ruche.grilleReine }}</p>
                <p>Plaque de font : {{ selected_ruche.plaqueFont }}</p>
                <p>Nourrisseur : {{ selected_ruche.nourrisseur }}</p>
              </v-card-text>
              <v-card-action>
                <v-dialog v-model="dialogRuche" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Ajouter un cadre
                    </v-btn>
                  </template>
                  <v-card>
                    <cadrePopup :cadre="cadre" />
                    <v-col cols="6"
                      ><v-btn color="primary" text @click="dialogRuche = false">
                        Fermer
                      </v-btn></v-col
                    >
                    <v-col cols="6"
                      ><v-btn
                        color="primary"
                        text
                        @click="addCadre(selected_ruche)"
                      >
                        Enregistrer Votre Cadre
                      </v-btn></v-col
                    >
                  </v-card>
                </v-dialog>
                <v-btn
                  color="primary"
                  @click="supprimerRuche(selected_ruche._id)"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Supprimer
                </v-btn>
              </v-card-action>
            </v-card>
            <v-card v-else-if="selected_cadre">
              <v-card-title class="headline" justify="center"
                >{{ selected_cadre.ref }}
              </v-card-title>
              <v-card-text>
                <p>Date du dépôt : {{ selected_cadre.dateDepot }}</p>
                <p>Ciré : {{ selected_cadre.ciree }}</p>
                <p>Miel : {{ selected_cadre.miel }}</p>
                <p>Pollen : {{ selected_cadre.pollen }}</p>
                <p>Couvain : {{ selected_cadre.couvain }}</p>
                <p>État du cadre : {{ selected_cadre.etatCadre }}</p>
              </v-card-text>
              <v-card-action>
                <v-btn
                  color="primary"
                  @click="supprimerCadre(selected_cadre._id)"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Supprimer
                </v-btn>
              </v-card-action>
            </v-card>
            <v-card v-else> </v-card>
          </v-col>

          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios");
export default {
  middleware: "users",
  name: "Hives",
  layout: "connected",
  watch: {},
  data() {
    return {
      opened_memory: [],
      selected_rucher: null,
      test: [],
      rucherToShow: null,
      selected_ruche: null,
      selected_cadre: null,
      dialogRuche: false,
      dialogRucher: false,
      ruchers: [],
      items: [],
      feedList: [],
      rucher: {
        localisation: "",
        ruches: [],
      },
      ruche: {
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
      },
      cadre: {
        dateDepot: null,
        ciree: "",
        miel: "",
        pollen: "",
        couvain: "",
        etatCadre: "",
      },
    };
  },
  mounted() {
    this.init();
    this.getAllRuchers();
  },
  methods: {
    closeRuche() {
      this.dialogRuche = false;
      this.getAllRuchers();
      this.resetInputs();
    },
    setSelectedRucher(item) {
      this.selected_ruche = null;
      this.selected_cadre = null;
      this.selected_rucher = Object.assign(
        {},
        this.ruchers.filter((x) => x.ref == item.name)[0]
      );
    },
    setSelectedRuche(item) {
      this.selected_cadre = null;
      this.selected_rucher = null;
      for (const rucher of this.ruchers)
        if (rucher.ruches.map((x) => x.ref).includes(item.name))
          this.selected_ruche = rucher.ruches.filter(
            (x) => x.ref == item.name
          )[0];
    },
    setSelectedCadre(item) {
      this.selected_ruche = null;
      this.selected_rucher = null;

      for (const rucher of this.ruchers)
        for (const ruche of rucher.ruches) {
          if (ruche.cadres.map((x) => x.ref).includes(item.name))
            this.selected_cadre = ruche.cadres.filter(
              (x) => x.ref == item.name
            )[0];
        }
    },
    supprimerRucher(id) {
      this.$del(`/rucher/${id}`)
        .then((res) => {
          this.selected_rucher = null;
          this.getAllRuchers();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          this.$notify({
            label: "Error",
            text: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    supprimerRuche(id) {
      this.$del(`/ruche/${id}`)
        .then((res) => {
          this.selected_ruche = null;
          this.getAllRuchers();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          this.$notify({
            label: "Error",
            text: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    supprimerCadre(id) {
      this.$del(`/cadre/${id}`)
        .then((res) => {
          this.selected_cadre = null;
          this.getAllRuchers();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          this.$notify({
            label: "Error",
            text: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    addCadre(ruche) {
      this.$post(`/cadre`, this.cadre)
        .then((res) => {
          console.log(res.data);
          ruche.cadres.push(res.data.cadre._id);
          this.$patch(`/ruche/${ruche._id}`, ruche).then((res) => {
            this.$notify({
              label: "Success",
              text: res.data.message,
              type: "success",
              showAnimation: "slideDown",
            });
          });
          this.resetInputs();
          this.getAllRuchers();
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            label: "Error",
            message: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    // activatedNode(nodes) {
    //   console.log(nodes);
    // },
    // openedNodes(nodes) {
    //   for (const node of nodes)
    //     if (!this.opened_memory.includes(node)) console.log(node);
    //   for (const opened of this.opened_memory)
    //     if (!nodes.includes(opened)) console.log(opened);
    //   this.opened_memory = nodes;
    // },
    getSelectedRucher() {
      this.rucherToShow = Object.assign(
        {},
        this.ruchers.filter((x) => x.ref == this.selectedRucher[0].name)[0]
      );
    },
    getAllRuchers() {
      this.$get("/ruchers")
        .then((res) => {
          if (res.data.success) {
            this.ruchers = res.data.ruchers;
            this.items = [];
            for (const rucher of res.data.ruchers) {
              let temp_ruches = [];
              for (const ruche of rucher.ruches) {
                let temp_cadres = [];
                for (const cadre of ruche.cadres) {
                  temp_cadres.push({
                    name: cadre.ref,
                    id: cadre._id,
                    children: [],
                  });
                }
                temp_ruches.push({
                  name: ruche.ref,
                  id: ruche._id,
                  children: temp_cadres,
                });
              }
              this.items.push({
                name: rucher.ref,
                id: rucher._id,
                children: temp_ruches,
              });
            }
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
    addRucher() {
      this.$post("/rucher", this.rucher)
        .then((res) => {
          this.getAllRuchers();
          this.resetInputs();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addRuche() {
      this.$post("/ruche", this.ruche).then((res) => {
        this.getAllRuchers();
        this.resetInputs();
        this.$notify({
          text: res.data.message,
          type: "success",
          showAnimation: "slideDown",
        });
      });
    },
    resetInputs() {
      this.ruche = {
        reine: {
          codeGen: "",
          marquee: "",
          clippe: "",
          dateNaissance: null,
        },
        cadres: [
          {
            dateDepot: null,
            ciree: "",
            miel: "",
            pollen: "",
            couvain: "",
            etatCadre: "",
          },
        ],
        typeRuche: "",
        rucher: "",
        debutService: null,
        hausse: "",
        grilleReine: "",
        plaqueFont: "",
        nourrisseur: "",
      };
      this.cadre = {
        dateDepot: null,
        ciree: "",
        miel: "",
        pollen: "",
        couvain: "",
        etatCadre: "",
      };
      this.rucher = {
        localisation: "",
        //ruche: [],
      };
      this.dialogRucher = false;
      this.dialogRuche = false;
    },
    async init() {
      this.$post("/filterNames", await this.getFeeds())
        .then((res) => {
          if (res.data.success) this.feedList = res.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFeeds() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds?x-aio-key=${process.env.ADAFRUIT_IO_KEY}`
          )
          .then((res) => {
            return resolve(res.data.map((x) => x.key));
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
  },
};
</script>
