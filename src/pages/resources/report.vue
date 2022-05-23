<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$route.params.collection" icon="home" :to="`/${$route.params.collection}`" />
        <q-breadcrumbs-el label="Report" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
      <q-btn label="Export" icon="share" color="cyan-8" class="flex q-ml-auto" />
    </q-toolbar>
    <div class="q-gutter-md row q-mb-md">
      <q-card class="col bg-blue-1 overflow-hidden">
        <q-card-section class="row justify-end items-center">
          <q-icon name="timer" style="font-size: 10em; position: absolute; left: -30px; bottom: -10px; opacity: .2;" class="text-blue-grey-4" />
          <div>
            <div class="text-h2 text-right text-weight-medium">186</div>
            <div class="text-subtitle1 text-blue-10 text-weight-bold text-right">Pending</div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col bg-teal-1 overflow-hidden">
        <q-card-section class="row justify-end items-center">
          <q-icon name="playlist_add_check" style="font-size: 10em; position: absolute; left: -30px; bottom: -10px; opacity: .2;" class="text-blue-grey-4" />
          <div>
            <div class="text-h2 text-right text-weight-medium">32</div>
            <div class="text-subtitle1 text-teal-10 text-weight-bold text-right">Success</div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col bg-orange-1  overflow-hidden">
        <q-card-section class="row justify-end items-center">
          <q-icon name="cancel" style="font-size: 10em; position: absolute; left: -30px; bottom: -10px; opacity: .2;" class="text-blue-grey-4" />
          <div>
            <div class="text-h2 text-right text-weight-medium">105</div>
            <div class="text-subtitle1 text-orange-10 text-weight-bold text-right">Canceled</div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col bg-red-1 overflow-hidden">
        <q-card-section class="row justify-end items-center">
          <q-icon name="delete" style="font-size: 10em; position: absolute; left: -30px; bottom: -10px; opacity: .2;" class="text-blue-grey-4" />
          <div>
            <div class="text-h2 text-right text-weight-medium">8</div>
            <div class="text-subtitle1 text-red-10 text-weight-bold text-right">Deleted</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- chart -->
    <div class="row q-gutter-md">
      <div class="col">
        <q-card class="q-mb-md">
          <q-card-section>
            <highcharts :options="chartOptions"></highcharts>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="q-mb-md">
          <q-card-section>
            <highcharts :options="chartOptions"></highcharts>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-gutter-md">
      <div class="col">
        <q-card class="q-mb-md">
          <q-card-section>
            <highcharts :options="chartOptions"></highcharts>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="q-mb-md">
          <q-card-section>
            <highcharts :options="chartOptions"></highcharts>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- end chart -->
  </q-page>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
  data () {
    return {
      framework: {
        components: [
          'QIcon'
        ]
      },
      chartOptions: {
        chart: {
          type: 'spline',
          height: 120
        },
        credits: {
          enabled: false
        },
        title: {
          text: 'Report Data'
        },
        legend: {
          enabled: false
        },
        series: [{
          data: [10, 0, 8, 2, 6, 4, 5, 5]
        }]
      }
    }
  },
  components: {
    highcharts: Chart
  }
}
</script>
