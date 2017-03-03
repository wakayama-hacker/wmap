<main-contents class="main-contents">
  <div class="item" each={ data } show={ data }>
    <div class="wrap">
      <h2>{ title }</h2>
      <p>{ content }</p>
    </div>
  </div>
  <home-contents class="home-contents" hide={ data }></home-contents>
  <script type="es6">
    if ( opts.data ) {
      this.data = opts.data
    }
  </script>
</main-contents>
