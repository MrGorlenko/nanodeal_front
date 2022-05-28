<template>
  <div :class="$style.news">
    <h2 :class="$style.header">Сегодня в Nanodeal</h2>
    <ul :class="$style.list">
      <li>
        <span :class="$style.number">28</span>
        <span :class="$style.label">Новых исполнителей</span>
      </li>
      <li>
        <span :class="$style.number">2500</span>
        <span :class="$style.label">Новых заданий бизнеса</span>
      </li>
      <li>
        <span :class="$style.number">18</span>
        <span :class="$style.label">Новых бизнесов</span>
      </li>
    </ul>
    <h2 :class="$style.header">Новости</h2>
    <div :class="$style['news-list']">
      <div :class="$style['news-item']">
        <img :class="$style.img" src="~/static/images/nike.png" alt="" />
        <p :class="$style.paragraph">
          Сегодня исполняется ровно в года, как мы запустили NanoDeal и решили
          отблагодарить всех своих партнеров
        </p>
        <p :class="$style.date">21 апреля 2021</p>
      </div>

      <div :class="$style['news-item']">
        <img :class="$style.img" src="~/static/images/nike.png" alt="" />
        <p :class="$style.paragraph">
          Сегодня исполняется ровно в года, как мы запустили NanoDeal и решили
          отблагодарить всех своих партнеров
        </p>
        <p :class="$style.date">21 апреля 2021</p>
      </div>

      <div :class="$style['news-item']">
        <img :class="$style.img" src="~/static/images/nike.png" alt="" />
        <p :class="$style.paragraph">
          Сегодня исполняется ровно в года, как мы запустили NanoDeal и решили
          отблагодарить всех своих партнеров
        </p>
        <p :class="$style.date">21 апреля 2021</p>
      </div>
    </div>
    <button :class="$style.more">Загрузить еще</button>
  </div>
</template>

<script>
export default {}
</script>

<style module lang="scss">
@import '~/assets/scss/variables.scss';
@import '~/assets/scss/global.scss';
.news {
  grid-area: News;
  background: #fff;
  border-radius: 16px;
  padding: 24px 25px;
  height: fit-content;
}

.header {
  margin-bottom: 20px;
}

.list {
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 30px;
  li {
    margin-right: 42px;
    display: flex;
    align-items: center;
    &:nth-child(1) {
      .number {
        color: $baseBlue;
      }
    }
    &:nth-child(2) {
      .number {
        color: $baseOrange;
      }
    }
    &:nth-child(3) {
      .number {
        color: $baseGreen;
      }
    }
  }
}

.number {
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
}

.label {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  width: 95px;
  margin-left: 10px;
}

.img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.news-item {
  display: grid;
  grid-template-areas: 'img par par' 'img date date';
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 6fr;
}

.paragraph,
.date {
  height: fit-content;
}

.paragraph {
  grid-area: par;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: $baseBlack;
}

.date {
  display: block;
  grid-area: date;
  border-bottom: 0.5px solid $orderGray;
  padding-bottom: 16px;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: $stepGray;
}

.img {
  grid-area: img;
}

.more {
  @include button-edit;
  margin: auto;
  border-radius: 10px;
  padding: 9.5px 16.5px;
}

@media (max-width: $mobile) {
  .list {
    flex-direction: column;
  }

  .img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  .paragraph {
    font-size: 13px;
    line-height: 15px;
    margin-bottom: 5px;
  }
}
</style>
