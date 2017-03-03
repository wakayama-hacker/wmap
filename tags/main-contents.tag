<main-contents>
  <div style="margin: 24px;" each={ data }>
    <h2>{ title }</h2>
    <p>{ content }</p>
  </div>
  <script type="es6">
    if ( opts.data ) {
      this.data = opts.data
    } else {

    }
  </script>
</main-contents>
