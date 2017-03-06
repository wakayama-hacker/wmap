<main-contents>
  <div class="item" each={ data } show={ data }>
    <div class="wrap">
      <h2>{ title }</h2>
      <p>{ content }</p>
      <iframe if={ lat && lng } width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="http://www.openlinkmap.org/small.php?lat={ lat }&lon={ lng }&zoom=8" style="border: 1px solid black"></iframe>
    </div>
  </div>
  <home-contents class="home-contents" hide={ data }></home-contents>
  <script type="es6">
    if ( opts.data ) {
      this.data = opts.data
    }
  </script>
</main-contents>
