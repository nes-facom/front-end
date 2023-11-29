<template>
  <div id="wrapper-component-webcam">
    <div v-if="foto64Bits === null" id="wrapper-section-camera">
      <div id="wrapper-camera">
        <div id="camera">
          <WebCam ref="webcamInstanciada" @cameras="listarCameras"> </WebCam>
        </div>
      </div>

      <div id="wrapper-camera-buttons">
        <div>
          <v-select
            v-model="cameraSelecionada"
            :items="cameras"
            item-value="id"
            item-text="nome"
            label="Câmeras"
            hide-details
            @change="trocarCamera"
            outlined
            dense
          ></v-select>
        </div>
        <div v-if="fotoBtnVisivel" cols="auto">
          <v-btn class="" @click="baterFoto">
            <v-icon> mdi-camera </v-icon>
            Foto
          </v-btn>
        </div>
      </div>
    </div>

    <div v-if="foto64Bits != null && fotoBlob == null && emprestimo == false">
      <v-row justify="center" class="mt-5">
        <vueCropper ref="cropperInstanciado" :src="foto64Bits"> </vueCropper>
      </v-row>

      <v-row class="mt-5" justify="center">
        <v-col>
          <v-btn @click="cancelarCrop"> Cancelar </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="croparFoto" color="blue"> Recortar Imagem </v-btn>
        </v-col>
      </v-row>
    </div>

    <div
      ref="container"
      
      class="d-flex justify-center align-center"
      v-if="fotoBlob != null && emprestimo === false"
    >
      <v-img :src="blobToURL" :style="imageStyle" height="400"> </v-img>
    </div>

    <div
      ref="container"
      id="exibicao-emprestimo"  
      
      class="d-flex justify-center align-center"
      v-if="foto64Bits != null && emprestimo === true"
    >
      <v-img :src="foto64Bits" height="400"> </v-img>
    </div>
  </div>
</template>

<script>
import { WebCam } from "vue-cam-vision";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "pgWebcamIndex",

  components: {
    WebCam,
    VueCropper,
  },

  props: {
    fotoBtnVisivel: {
      default: true,
    },
    solicitarImagem: {
      default: false,
    },
    emprestimo: {
      default: false,
    },
  },

  data() {
    return {
      foto64Bits: null,
      fotoBlob: null,
      blobToURL: null,
      cameras: [],
      cameraSelecionada: null,
      imageWidth: 1000,
      imageHeight: 100,
    };
  },

  methods: {
    trocarCamera() {
      this.$refs.webcamInstanciada.changeCamera(this.cameraSelecionada);
    },

    listarCameras(camerasList) {
      for (let index = 0; index < camerasList.length; index++) {
        this.cameras.push({
          id: camerasList[index].deviceId,
          nome: camerasList[index].label,
        });
      }
    },

    cancelarCrop() {
      this.foto64Bits = null;
    },

    async baterFoto() {
      await this.$refs.webcamInstanciada.capture().then((fotoBase64) => {
        this.foto64Bits = fotoBase64;
      });
    },

    async croparFoto() {
      await this.$refs.cropperInstanciado.getCroppedCanvas().toBlob((blob) => {
        this.fotoBlob = blob;
        this.blobToURL = URL.createObjectURL(blob);
        if (this.fotoBlob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.teste = reader.result;
            this.enviarFoto();
          };
          reader.readAsDataURL(this.fotoBlob);
        }
      });
    },

    enviarFoto() {
      if (this.emprestimo == true) {
        this.$emit("imagem64", this.foto64Bits);
      } else {
        this.$emit("imagem64", this.teste);
      }
    },
  },

  computed: {
    imageStyle() {
    if (this.blobToURL) {
      const img = new Image();
      img.src = this.blobToURL;

      const containerWidth = 400;
      const containerHeight = 400;

      let width = containerWidth;
      let height = containerHeight;

      if (img.width > img.height) {
        height = containerWidth * (img.height / img.width);
      } else {
        width = containerHeight * (img.width / img.height);
      }

      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    }
    return {
      width: 'auto',
      height: 'auto',
    };
  },
  },

  watch: {
    async solicitarImagem(novo, antigo) {
      if (antigo == false && novo == true && this.emprestimo == false) {
        await this.baterFoto();
        await this.croparFoto();
        this.enviarFoto();
      } else if (antigo == false && novo == true && this.emprestimo == true) {
        await this.baterFoto();
        this.enviarFoto();
      }
    },
  },
};
</script>

<style scoped>
#wrapper-component-webcam {
  width: 100%;

  display: flex;
}

#wrapper-section-camera {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#wrapper-camera {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

#camera {
  width: 25rem;
  height: 25rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

#wrapper-camera-buttons {
  display: flex;
  width: 100%;

  justify-content: space-around;
}
</style>
