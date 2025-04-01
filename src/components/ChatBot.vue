<template>
  <div class="chat-bot" :class="{ 'chat-bot--open': isOpen }">
    <!-- Chat Button -->
    <button class="chat-bot__toggle" @click="toggleChat">
      <i class='bx bx-message-square-dots'></i>
      <span class="chat-bot__badge" v-if="unreadCount">{{ unreadCount }}</span>
    </button>

    <!-- Chat Window -->
    <div class="chat-bot__window">
      <!-- Chat Header -->
      <div class="chat-bot__header">
        <div class="chat-bot__header-content">
          <i class='bx bx-bot'></i>
          <h3>Чат с Nurchik</h3>
        </div>
        <button class="chat-bot__close" @click="toggleChat">
          <i class='bx bx-x'></i>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="chat-bot__messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="['chat-bot__message', message.type]">
          <div class="chat-bot__message-content">
            <p>{{ message.text }}</p>
            <span class="chat-bot__message-time">{{ message.time }}</span>
          </div>
          <div class="chat-bot__message-avatar">
            <i :class="message.type === 'bot' ? 'bx bx-bot' : 'bx bx-user'"></i>
          </div>
        </div>
      </div>

      <!-- Quick Replies -->
      <div class="chat-bot__quick-replies" v-if="showQuickReplies">
        <button v-for="(reply, index) in quickReplies" 
                :key="index"
                class="chat-bot__quick-reply"
                @click="sendMessage(reply)">
          {{ reply }}
        </button>
      </div>

      <!-- Chat Input -->
      <div class="chat-bot__input">
        <input type="text" 
               v-model="userInput" 
               @keyup.enter="sendMessage(userInput)"
               placeholder="Введите сообщение..."
               :disabled="isTyping">
        <button class="chat-bot__send" 
                @click="sendMessage(userInput)"
                :disabled="!userInput.trim() || isTyping">
          <i class='bx bx-send'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [],
      isTyping: false,
      unreadCount: 0,
      showQuickReplies: true,
      quickReplies: [
        'Привет!',
        'Расскажи о себе',
        'Покажи проекты',
        'Как с тобой связаться?'
      ],
      botResponses: {
        'Привет!': 'Привет! Я Nurchik, веб-разработчик. Чем могу помочь?',
        'Расскажи о себе': 'Я опытный веб-разработчик с более чем 5-летним стажем. Специализируюсь на создании современных и удобных веб-приложений.',
        'Покажи проекты': 'Вы можете посмотреть мои проекты в разделе "Портфолио". Там представлены все мои лучшие работы.',
        'Как с тобой связаться?': 'Вы можете связаться со мной через форму в разделе "Контакты" или написать на email: nurchik@example.com'
      }
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.unreadCount = 0;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    sendMessage(text) {
      if (!text.trim() || this.isTyping) return;

      // Add user message
      this.addMessage(text, 'user');
      this.userInput = '';

      // Show typing indicator
      this.isTyping = true;

      // Simulate bot response
      setTimeout(() => {
        const response = this.getBotResponse(text);
        this.addMessage(response, 'bot');
        this.isTyping = false;
        this.scrollToBottom();
      }, 1000);
    },
    addMessage(text, type) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.messages.push({ text, type, time });
      if (!this.isOpen) {
        this.unreadCount++;
      }
    },
    getBotResponse(text) {
      // Check for mathematical expressions
      const mathMatch = text.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
      if (mathMatch) {
        const [_, num1, operator, num2] = mathMatch;
        let result;
        switch(operator) {
          case '+': result = parseInt(num1) + parseInt(num2); break;
          case '-': result = parseInt(num1) - parseInt(num2); break;
          case '*': result = parseInt(num1) * parseInt(num2); break;
          case '/': result = parseInt(num1) / parseInt(num2); break;
        }
        return `${num1} ${operator} ${num2} = ${result}`;
      }

      // Check for exact matches
      if (this.botResponses[text]) {
        return this.botResponses[text];
      }

      // Check for partial matches
      for (const key in this.botResponses) {
        if (text.toLowerCase().includes(key.toLowerCase())) {
          return this.botResponses[key];
        }
      }

      // AI-like responses for unknown queries
      const aiResponses = [
        'Интересный вопрос! Давайте разберем его подробнее.',
        'Я могу помочь вам с этим. Что именно вас интересует?',
        'Это зависит от конкретных обстоятельств. Расскажите больше.',
        'Я понимаю ваш вопрос. Давайте обсудим это детальнее.',
        'Это хороший вопрос! Я могу поделиться своим опытом.',
        'Давайте разберем это пошагово. С чего бы вы хотели начать?',
        'Я специализируюсь на веб-разработке. Могу помочь вам с этим направлением.',
        'Это интересная тема! Я могу поделиться своими знаниями в этой области.'
      ];

      // Return random AI response
      return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    }
  }
}
</script>

<style scoped>
.chat-bot {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chat-bot__toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #00ff88;
  border: none;
  color: #2d3436;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
  transition: all 0.3s ease;
  position: relative;
}

.chat-bot__toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
}

.chat-bot__badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.chat-bot__window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transform: translateY(20px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.chat-bot--open .chat-bot__window {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.chat-bot__header {
  padding: 1rem;
  background: #00ff88;
  color: #2d3436;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-bot__header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chat-bot__header-content i {
  font-size: 1.5rem;
}

.chat-bot__header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.chat-bot__close {
  background: none;
  border: none;
  color: #2d3436;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.chat-bot__close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.chat-bot__messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-bot__message {
  display: flex;
  gap: 0.5rem;
  max-width: 80%;
}

.chat-bot__message.user {
  margin-left: auto;
  flex-direction: row-reverse;
}

.chat-bot__message-content {
  background: #f5f5f5;
  padding: 0.8rem 1rem;
  border-radius: 15px;
  position: relative;
}

.chat-bot__message.user .chat-bot__message-content {
  background: #00ff88;
  color: #2d3436;
}

.chat-bot__message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  display: block;
  margin-top: 0.3rem;
}

.chat-bot__message-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #00ff88;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2d3436;
}

.chat-bot__quick-replies {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: #f8f8f8;
}

.chat-bot__quick-reply {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #00ff88;
  color: #00ff88;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chat-bot__quick-reply:hover {
  background: #00ff88;
  color: #2d3436;
}

.chat-bot__input {
  padding: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 0.5rem;
}

.chat-bot__input input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 20px;
  outline: none;
  transition: all 0.3s ease;
}

.chat-bot__input input:focus {
  border-color: #00ff88;
}

.chat-bot__send {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00ff88;
  border: none;
  color: #2d3436;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.chat-bot__send:hover {
  transform: scale(1.1);
}

.chat-bot__send:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .chat-bot__window {
    width: 100%;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }

  .chat-bot__toggle {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}
</style> 