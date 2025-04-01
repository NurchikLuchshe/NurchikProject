<template>
  <div class="avatar-upload">
    <div class="avatar-preview" @click="triggerFileInput">
      <img v-if="imagePreview" :src="imagePreview" alt="Avatar preview" class="avatar-image" />
      <div v-else class="avatar-placeholder">
        <i class="fas fa-user"></i>
      </div>
      <div class="avatar-overlay">
        <i class="fas fa-camera"></i>
      </div>
    </div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      accept="image/*"
      class="file-input"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'AvatarUpload',
  data() {
    return {
      imagePreview: null
    };
  },
  methods: {
    ...mapMutations(['setUserAvatar']),
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Проверка типа файла
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
      }

      // Создаем URL для превью
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
        // Сохраняем в store
        this.setUserAvatar(e.target.result);
        // Сохраняем в localStorage
        localStorage.setItem('userAvatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  },
  mounted() {
    // Загружаем сохраненную аватарку при монтировании
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      this.imagePreview = savedAvatar;
    }
  }
};
</script>

<style scoped>
.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: var(--bg-secondary);
  border: 3px solid var(--primary-color);
  transition: all 0.3s ease;
}

.avatar-preview:hover {
  transform: scale(1.05);
}

.avatar-preview:hover .avatar-overlay {
  opacity: 1;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--text-color);
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-overlay i {
  color: white;
  font-size: 2rem;
}

.file-input {
  display: none;
}
</style> 