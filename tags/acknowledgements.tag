<acknowledgements>

  <section class="authors">
    <div class="wrap">
      <h2>{ title }</h2>
      <section class="author" each={ authors }>
        <div class="wrap">
          <header class="author-header">
            <h3 class="author-title">{ name }<a if={ link } class="link-aside" href={ link }><i class="glyphicon glyphicon-link"></a></i></h3>
            <img if={ github } class="avatar" src={ 'https://avatars.githubusercontent.com/' + github } />
          </header>
          <p class="author-description">{ whoami }</p>
          <div class="author-contents"></div>
        </div>
      </section>
    </div>
  </section>

  <script type="es6">
    this.authors = opts.authors
    this.title = opts.title
  </script>

</acknowledgements>
