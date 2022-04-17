<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Espace personnel </v-card-title>
        <v-card-text>
          <p>
            Bienvenue sur Ruche Connectée, votre plateforme de gestion de fermes
            apicoles
          </p>
          <p>
            Vous pouvez désormais modéliser votre ferme avec le
            <a :href="'/hives'">gestionnaire des ruches.</a>
          </p>
          <p>
            Après cela, vous pourrez configurer l'automatisation des mesures.
          </p>
          <p>
            Vous aurez également la possibilité de garder un enregistrement de
            vos
            <a :href="'/visits'">visites.</a>
          </p>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "users",
  layout: "connected",
  name: "Dashboard",
  mounted: function () {},
};
</script>
