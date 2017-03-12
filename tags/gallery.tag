<gallery class="gallery">

  <div class="back" onclick="{ click }"><i class="glyphicon glyphicon-remove"></i></div>


  <div class="image-wrap">
    <img src={ src } class="image" alt="" />
  </div>

  <script type="es6">

    this.src = './images/' + opts.image + '.jpg'

    this.click = function() {
      window.history.back()
    }.bind( this )

  </script>
</gallery>
