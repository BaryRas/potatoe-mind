<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title
          class="text-h5 grey lighten-2 mb-5"
          color="var(--v-background-base)"
        >
          Welcome to Potatoe Mind
        </v-card-title>

        <v-card-text>
          Please, create new account or login to begin your journey
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
