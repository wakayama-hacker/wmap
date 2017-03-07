<acknowledgements>

  <section class="authors">
    <div class="wrap">
      <h2>{ title }</h2>
      <div class="author-items">
        <section class="author-item" each={ authors }>
          <h3 class="author-title text-center">{ name }<a if={ link } class="link-aside" href={ link }><i class="glyphicon glyphicon-link"></a></i></h3>
          <div class="text-center">
            <img class="avatar" src={ github ? '//avatars.githubusercontent.com/' + github : '../images/nobody.png' } />
          </div>
          <p class="author-description">{ whoami }</p>
        </section>
      </div>
    </div>
  </section>

  <script type="es6">
    this.authors = opts.authors
    this.title = opts.title
  </script>

</acknowledgements>
