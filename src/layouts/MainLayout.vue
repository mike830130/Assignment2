<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="absolute-center">
          <div class="q-pa-md">
            <q-btn flat dense round @click="onAddDate(-1)" >
              <q-icon
                class="fas fa-arrow-left"
                style="margin-right: 5px"
              ></q-icon>
            </q-btn>
            <q-btn-dropdown
              split
              class="glossy"
              color="teal"
              :label="firstButton.title"
              :icon="firstButton.icon"
            >
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  v-for="item in activeButton"
                  :key="item.title"
                  @click="onItemClick(item.pageType)"
                >
                  <q-item-section avatar>
                    <q-avatar
                      :icon="item.icon"
                      color="primary"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.title }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn flat dense round @click="onAddDate(1)" v-if="pageType != 'calendar'">
              <q-icon
                class="fas fa-arrow-right"
                style="margin-left: 5px"
              ></q-icon>
            </q-btn>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="767"
      :width="250"
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header style="color:white">
          Navigation
        </q-item-label>
        <q-item
          clickable
          tag="a"
          v-for="link in essentialLinks"
          :to="link.link"
          exact
          class="text-grey-4"
          :key="link.title"
        >
          <q-item-section v-if="link.icon" avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :taskType="pageType" :taskKey="taskKey"/>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import EssentialLink from 'components/NavigationLink.vue'
import ExampleComponent from 'components/CompositionComponent.vue'
import { defineComponent, ref } from '@vue/composition-api'

const linksData = [
  {
    title: 'Todo',
    icon: 'list',
    link: './'
  },
  {
    title: 'Settings',
    icon: 'settings'
  }
]

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup () {
    const leftDrawerOpen = ref(false)
    const essentialLinks = ref(linksData)
    return { leftDrawerOpen, essentialLinks }
  },
  data () {
    return {
      toolBarDes: '',
      pageType: 'today',
      active: '',
      pageDate: new Date(),
      taskKey: '',
      firstButton: {
        title: '',
        pageType: '',
        icon: ''
      },
      buttonListData: [
        {
          title: 'Day',
          icon: 'today',
          pageType: 'today'
        },
        {
          title: 'Week',
          icon: 'fas fa-calendar-week',
          pageType: 'week'
        },
        {
          title: 'Month',
          icon: 'fas fa-calendar-alt',
          pageType: 'month'
        },
        {
          title: 'Year',
          pageType: 'year',
          icon: 'fas fa-calendar'
        },
        {
          title: 'Calendar',
          pageType: 'calendar',
          icon: 'far fa-calendar'
        }
      ]
    }
  },
  methods: {
    currentType: function () {
      if (this.pageType === 'today') {
        this.toolBarDes = 'Today'
      } else if (this.pageType === 'month') {
        this.toolBarDes = 'Month'
      }
    },
    selected (name: string) {
      this.active = name
    },
    getWeek (currentDay: Date) {
      var day = currentDay.getDay()
      var date = currentDay.getDate()
      var firstDay = new Date()
      var lastDay = new Date()
      if (day === 1) {
        firstDay = currentDay
      }
      if (day === 0) {
        firstDay.setDate(date - 6)
      } else {
        firstDay.setDate(date - day + 1)
      }

      lastDay.setDate(firstDay.getDate() + 7)
      var firstDayStr = firstDay.getFullYear().toString() + '/' + (firstDay.getMonth() + 1).toString() + '/' + firstDay.getDate().toString()
      var lastDayStr = lastDay.getFullYear().toString() + '/' + (lastDay.getMonth() + 1).toString() + '/' + lastDay.getDate().toString()

      return firstDayStr + '-' + lastDayStr
    },
    CaculateCurrentType () {
      for (var i = 0; i < this.buttonListData.length; i++) {
        if (this.buttonListData[i].pageType === this.pageType) {
          this.firstButton.title = this.buttonListData[i].title
          this.firstButton.pageType = this.buttonListData[i].pageType
          this.firstButton.icon = this.buttonListData[i].icon
        }
      }

      if (this.pageType === 'today') {
        this.taskKey = this.pageDate.getFullYear().toString() + (this.pageDate.getMonth() + 1).toString() + this.pageDate.getDate().toString()
      }
      if (this.pageType === 'week') {
        var weekStr = this.getWeek(this.pageDate).replace('/', '').replace('/', '')
        this.taskKey = weekStr.split('-')[0]
      }
      if (this.pageType === 'month') {
        this.taskKey = this.pageDate.getFullYear().toString() + (this.pageDate.getMonth() + 1).toString()
      }
      if (this.pageType === 'year') {
        this.taskKey = this.pageDate.getFullYear().toString()
      }

      var currentDate = new Date()
      if (
        this.pageType === 'today' &&
        (this.pageDate.getFullYear() !== currentDate.getFullYear() ||
          this.pageDate.getMonth() !== currentDate.getMonth() ||
          this.pageDate.getDate() !== currentDate.getDate())
      ) {
        const yy = this.pageDate.getFullYear()
        const mm = this.pageDate.getMonth() + 1
        const dd = this.pageDate.getDate()
        this.firstButton.title =
          yy.toString() + '/' + mm.toString() + '/' + dd.toString()
        this.taskKey = this.firstButton.title.replace('/', '').replace('/', '')
      }
      if (this.pageType === 'week') {
        var currentDateWeekStr = this.getWeek(currentDate)
        var pageDateWeekStr = this.getWeek(this.pageDate)
        if (currentDateWeekStr !== pageDateWeekStr) {
          this.firstButton.title = pageDateWeekStr
          this.taskKey = this.firstButton.title.split('-')[0].replace('/', '').replace('/', '')
        }
      }
      if (this.pageType === 'month' && this.pageDate.getMonth() !== currentDate.getMonth()) {
        this.firstButton.title = this.pageDate.toDateString().split(' ')[1]
        this.taskKey = this.firstButton.title.replace('/', '').replace('/', '')
      }
      if (this.pageType === 'year' && this.pageDate.getFullYear() !== currentDate.getFullYear()) {
        this.firstButton.title = this.pageDate.getFullYear().toString()
        this.taskKey = this.firstButton.title.replace('/', '').replace('/', '')
      }
    },
    onItemClick (pageType: string) {
      this.pageType = pageType
      this.CaculateCurrentType()
    },
    onAddDate (addNum: number) {
      var date = this.pageDate
      var newDate = 0
      var newMonth = 0
      var newYear = 0
      if (this.pageType === 'today') {
        newDate = date.getDate() + addNum
        this.pageDate.setDate(newDate)
      }
      if (this.pageType === 'week') {
        newDate = date.getDate() + (addNum * 7)
        this.pageDate.setDate(newDate)
      }
      if (this.pageType === 'month') {
        newMonth = date.getMonth() + addNum
        this.pageDate.setMonth(newMonth)
      }
      if (this.pageType === 'year') {
        newYear = date.getFullYear() + addNum
        this.pageDate.setFullYear(newYear)
      }

      this.CaculateCurrentType()
    }
  },
  created () {
    this.CaculateCurrentType()
  },
  computed: {
    activeButton: function () {
      var pt = this.pageType
      return this.buttonListData.filter(function (item) { 
        return item.pageType !== pt
      })
    }
  }
})
</script>

<style lang='scss'>
.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
    background-color: #5394c9;
  }
}
</style>
