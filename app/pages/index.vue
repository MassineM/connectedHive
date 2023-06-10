<template>
  <v-container>
    <v-row align="start" class="mt-4">
      <v-col cols="6">
        <v-card flat class="mt-1 pa-2">
          <v-card-title tag="h1" style="word-break: break-word">
            Ruche Connectée - plateforme de gestion de fermes apicoles
          </v-card-title>
          <v-card-text>
            Notre objectif: faciliter l'automatisation de la surveillance de
            l'état de vos ruches.
          </v-card-text>
          <v-card-text
            >Connectez ou inscrivez vous pour accéder à votre espace personnel.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-2">
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    depressed
                    block
                    color="secondary"
                    :outlined="register_mode"
                    @click="register_mode ? switch_mode() : null"
                  >
                    Connexion
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    depressed
                    block
                    color="secondary"
                    :outlined="!register_mode"
                    @click="!register_mode ? switch_mode() : null"
                  >
                    Inscription
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <!-- <v-spacer />
          <v-switch v-model="register_mode" color="grey" inset></v-switch>
          <v-spacer /> -->
          </v-card-actions>
          <v-card-actions>
            <v-container>
              <v-row class="text-xs-right">
                <v-spacer />
                <v-col cols="8 " class="text-md-center">
                  <em>
                    <small color="info">
                      {{
                        register_mode
                          ? "Saisissez les informations requises et envoyez pour continuer."
                          : "Saisissez votre adresse email et votre mot de passe pour continuer."
                      }}
                    </small>
                  </em>
                </v-col>
                <v-spacer />
              </v-row>
              <v-row class="creds">
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="text"
                        v-model="user.firstname"
                        label="Nom"
                        placeholder="White"
                        outlined
                        :rules="rules.string"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="text"
                        v-model="user.lastname"
                        label="Prénom"
                        placeholder="Walter"
                        outlined
                        :rules="rules.string"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-row>
                    <v-col :cols="register_mode ? 6 : 12">
                      <v-text-field
                        type="email"
                        v-model="user.email"
                        label="Adresse email"
                        placeholder="exemple@gmail.com"
                        outlined
                        :rules="rules.string"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="tel"
                        v-model="user.numTel"
                        label="Numéro de télephone"
                        placeholder="0XXXXXXXXX"
                        outlined
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-row>
                    <v-col :cols="register_mode ? 6 : 12">
                      <v-text-field
                        type="password"
                        v-model="user.password"
                        label="Mot de passe"
                        placeholder="********"
                        outlined
                        :rules="rules.string"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="password"
                        v-model="user.conf_password"
                        label="Confiramtion du mot de passe"
                        placeholder="********"
                        outlined
                        :rules="rules.string"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-container>
              </v-row>
              <v-row>
                <v-spacer />
                <v-col cols="6">
                  <v-btn
                    block
                    color="primary"
                    @click="register_mode ? register() : login()"
                  >
                    {{ register_mode ? "S'inscrire" : "Se connecter" }}
                  </v-btn></v-col
                >
                <v-spacer />
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "IndexPage",
  data: function () {
    return {
      register_mode: false,
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        conf_password: "",
        numTel: "",
      },
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
  mounted: function () {
    if (this.$store.state && this.$store.state.auth) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    switch_mode() {
      this.register_mode = !this.register_mode;
    },
    register() {
      if (this.user.password == this.user.conf_password) {
        this.$post("/user", this.user)
          .then((res) => {
            if (res.data.success) {
              this.login();
              // this.$notify({
              //   text: res.data.message,
              //   type: "success",
              // });
            } else {
              this.$notify({
                title: "Error occured",
                text: res.data.message,
                type: "error",
                showAnimation: "slideDown",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$notify({
          title: "Error occured",
          text: "Erreur configuration du mot de passe",
          type: "error",
          showAnimation: "slideDown",
        });
      }
    },
    login() {
      this.$post("/login", this.user)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit("setAuth", res.data);
            Cookie.set("auth", res.data);
            if (process.browser) {
              localStorage.setItem(
                "last_login_address_used_successfully",
                res.data.user.email.toLowerCase()
              );
            }
            this.$router.push("/dashboard");
          } else {
            this.$notify({
              title: "Error occured",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="css" scoped></style>
