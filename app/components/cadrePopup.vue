<template>
  <v-card>
    <v-card-title>
      <span>Cadre</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="Ciré"
              v-model="cadre.ciree"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="6">
            <v-text-field
              type="date"
              label="Date du Dépôt"
              v-model="cadre.dateDepot"
              outlined
              :rules="rules.date"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="Miel"
              v-model="cadre.miel"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="Pllen"
              v-model="cadre.pollen"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="string"
              label="Couvain"
              v-model="cadre.couvain"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="État"
              v-model="cadre.etatCadre"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import ruche from "../components/ruchePopup.vue";
export default {
  props: ["cadre"],
  data() {
    return {
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
  methods: {},
};
</script>
