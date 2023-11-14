<template>
  <div id="pgWebcam"
       :style="'width: ' + this.width + 'px; height: ' + this.height + 'px;'">
    <div v-if="foto64Bits == null">
      <v-row justify="center">
        <WebCam ref="webcamInstanciada"
                width="500"
                height="390"
                @cameras="listarCameras">
        </WebCam>
      </v-row>

      <v-row>
        <v-col>
          <v-select v-model="cameraSelecionada"
                    :items="cameras"
                    item-value="id"
                    item-text="nome"
                    label="Câmeras"
                    @change="trocarCamera"
                    outlined
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-btn class=""
                 @click="baterFoto"
                 size="30"
                 color="blue">
            <v-icon class="mr-1">
              mdi-camera
            </v-icon>
            Bater Foto
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div v-if="foto64Bits != null && fotoBlob == null">
      <v-row justify="center"
             class="mt-5">
        <vueCropper ref="cropperInstanciado"
                    :src="foto64Bits">
        </vueCropper>
      </v-row>

      <v-row class="mt-5"
             justify="center">
        <v-col>
          <v-btn @click="cancelarCrop">
            Cancelar
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="croparFoto"
                 color="blue">
            Recortar Imagem
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div ref="container"
         style="width: 500px; height: 500px; overflow: hidden"
         class="d-flex justify-center align-center"
         v-if="fotoBlob != null">
      <v-img :src="blobToURL"
             :style="imageStyle"
              height="500">
      </v-img>
    </div>
  </div>
</template>

<script>
import { WebCam } from 'vue-cam-vision'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: "pgWebcamIndex",
  components: {
    WebCam,
    VueCropper
  },
  data() {
    return {
      foto64Bits: null,
      fotoBlob: null,
      blobToURL: null,
      cameras: [],
      cameraSelecionada: null,
      imageWidth: 1000,
      imageHeight: 100
    }
  },
  methods: {
    trocarCamera() {
      this.$refs.webcamInstanciada.changeCamera(this.cameraSelecionada)
    },
    listarCameras(camerasList) {
      for (let index = 0; index < camerasList.length; index++) {
        this.cameras.push({
          'id': camerasList[index].deviceId,
          'nome': camerasList[index].label
        })
      }
    },
    cancelarCrop() {
      this.foto64Bits = null
    },
    async baterFoto() {
      await this.$refs.webcamInstanciada.capture().then((fotoBase64) => {
        this.foto64Bits = fotoBase64
      })
    },
    async croparFoto() {
      await this.$refs.cropperInstanciado.getCroppedCanvas().toBlob((blob) => {
        this.fotoBlob = blob
        this.blobToURL = URL.createObjectURL(blob)

        this.enviarFoto()
      });
    },
    enviarFoto() {
      this.$emit('imagem64', this.foto64Bits)
    }
  },
  computed: {
    imageStyle() {
      // Calcula a proporção da imagem
      const imageAspectRatio = this.imageWidth / this.imageHeight;

      // Obtém a largura e a altura da div
      const containerWidth = 500;
      const containerHeight = 500;

      // Calcula a largura e a altura da imagem para se ajustar à div
      let width = containerWidth;
      let height = containerWidth / imageAspectRatio;

      // Verifica se a altura ultrapassa a altura da div
      if (height > containerHeight) {
        height = containerHeight;
        width = containerHeight * imageAspectRatio;
      }

      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    }
  },
  props: {
    width: {
      default: 500
    },
    height: {
      default: 520
    }
  }
}
</script>

<style scoped>

</style>