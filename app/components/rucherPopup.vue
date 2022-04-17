<template>
  <v-card>
    <v-card-title>
      <span>Rucher</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="string"
              label="Localisation"
              v-model="rucher.localisation"
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
export default {
  props: {
    rucher: Object,
    ruche: Object,
  },
  data() {
    return {
      dialogRuche: false,
      selectedItem: "",

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
    removeRuche(index) {
      this.rucher.ruches.splice(index, 1);
    },
  },
};
</script>
