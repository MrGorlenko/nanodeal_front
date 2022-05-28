<template>
  <div :class="$style.wrapper">
    <h2 :class="$style.header">F.A.Q.</h2>
    <p :class="$style.label">
      Прежде чем начинать чат с поддержкой, пожалуйста, посмотрите F.A.Q. В нем
      есть ответы на большинство популярных вопросов.
    </p>
    <div :class="$style.questions">
      <div
        v-for="(faq, indexQuestion) in FAQ"
        :key="faq.title"
        :class="$style.topic"
      >
        <p :class="$style['topic-symbol']" @click="switchOpen(indexQuestion)">
          <span v-if="!faq.opened">+</span>
          <span v-else>-</span>
        </p>
        <p
          :class="[$style['topic-title'], faq.opened ? $style.selected : '']"
          @click="switchOpen(indexQuestion)"
        >
          {{ faq.title }}
        </p>
        <ul v-if="faq.opened" :class="$style['topic-list']">
          <li v-for="(topic, indexTopic) in faq.topics" :key="topic.question">
            <span
              v-if="topic.opened"
              :class="$style['topic-symbol']"
              @click="switchOpenTopic(indexQuestion, indexTopic)"
              >-</span
            >
            <span
              v-else
              :class="$style['topic-symbol']"
              @click="switchOpenTopic(indexQuestion, indexTopic)"
              >+</span
            >
            <p
              :class="[$style.question, topic.opened ? $style.selected : '']"
              @click="switchOpenTopic(indexQuestion, indexTopic)"
            >
              {{ topic.question }}
            </p>
            <p v-if="topic.opened" :class="$style.answer">{{ topic.answer }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FAQ: [
        {
          title: '',
          opened: false,
          topics: [
            {
              question: '',
              answer: ' ',
              opened: false,
            },
            {
              question: '',
              answer: '',
              opened: false,
            },
            {
              question: '',
              answer: '',
              opened: false,
            },
          ],
        },
      ],
    }
  },
  created() {
    this.getFAQ()
  },
  methods: {
    switchOpen(index) {
      this.FAQ[index].opened = !this.FAQ[index].opened
    },
    switchOpenTopic(indexQuestion, indexTopic) {
      this.FAQ[indexQuestion].topics[indexTopic].opened =
        !this.FAQ[indexQuestion].topics[indexTopic].opened
    },
    getFAQ() {
      this.$axios.get('/api/v1/faq/').then((res) => {
        this.FAQ = res.data
      })
    },
  },
}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';

.header {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
}

.label {
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
}

.wrapper {
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0px 0.989583px 2.96875px rgba(233, 216, 207, 0.3);
  padding: 30px;
}

.selected {
  color: $baseOrange;
}

.topic {
  position: relative;
}

.topic-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  margin-left: 30px;
  border-bottom: 0.5px solid $orderGray;
  padding-bottom: 15px;
}

.topic-symbol {
  position: absolute;
  left: 0px;
  font-weight: bold;
  color: $baseOrange;
  font-size: 25px;
  top: 2px;
  line-height: 10px;
  cursor: pointer;
}

.topic-list {
  padding-left: 15px;
  list-style-type: none;
  li {
    position: relative;
    p {
      margin-left: 30px;
    }
  }
}

.question {
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  border-bottom: 0.5px solid $orderGray;
  padding-bottom: 15px;
}

.answer {
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
}
</style>
