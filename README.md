Note: Work In Progress : (Working with rlatively new technologies, submitting my initial draft keeping in mind the time constraint, will continue working on this as this is sort of interesting :) )

Got this so far : 




Get Metrics:
query{
  getMetrics
}

Get MEasurements:
query {
  getMeasurements(input: {metricName: "flareTemp"}) {
    metric
    value
    unit
    at
  }
}

Get Multiple measurements:

query {
  getMultipleMeasurements(input: {metricName: "flareTemp"}) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}

Get last known measurements,

## Create React App Visualization

This assessment was bespoke handcrafted for Anusha Ganti.

Read more about this assessment [here](https://react.eogresources.com)
