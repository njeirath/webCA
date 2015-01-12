$( document ).ready( function() {
    var running = false
    var count = 0
    var last_count = 0

    $("#randomize").click(function() {
        randomize()
    })

    $("#start").click(function() {
        running = true
        count = 0
        last_count = 0

        runit()
        calc_fps()
    })

    $("#stop").click(function() {
        running = false
    })

    function calc_fps() {
        $("#fps").html(count-last_count)
        last_count = count
        if (running) setTimeout(calc_fps, 1000)
    }

    function runit() {
        iterate()
        count++

        $("#counter").html(count)
        if (running) setTimeout(runit, 0)
    }

    function randomize() {
        var canvas = document.getElementById("canvas")
        var context = canvas.getContext("2d")
        var image = context.createImageData(canvas.height,canvas.width)
        var img = new Image(image)

        for (var i = 0; i < canvas.width; i++) {
            for (var j = 0; j < canvas.height; j++) {
                img.setRGB(i, j, [Math.random()*255,Math.random()*255,Math.random()*255])
            }
        }

        image = img.getImage()
        context.putImageData(image,0,0)
    }

    function iterate() {
        var canvas = document.getElementById("canvas")
        var context = canvas.getContext("2d")
        var height = canvas.height
        var width = canvas.width
        var newImg = new Image(context.createImageData(width, height))
        var oldImg = new Image(context.getImageData(0,0,width, height))

        getNextImage(oldImg, newImg)
        context.putImageData(newImg.getImage(),0,0)
    }

    function getNextImage(image, newImage) {
        for (var i = 0; i < newImage.getWidth(); i++) {
            for (var j = 0; j < newImage.getHeight(); j++) {
                array = image.getLocal(i,j)

                var red = 0
                var grn = 0
                var blu = 0

                for (a = 0; a < 3; a++) {
                    for (b = 0; b < 3; b++) {
                        red += array[a][b][0]
                        grn += array[a][b][1]
                        blu += array[a][b][2]
                    }
                }

                ///////////////////////////////////////////////////////////////////////////////
                //new_red = 0
                //new_grn = 0
                //new_blu = 0
                //if ((red / 9) > 250) {
                //    new_red = Math.random()*8
                //} else {
                //    new_red = red/9 * (Math.random()/10 + 1)
                //}
                //
                //if ((grn / 9) > 250) {
                //    new_grn = Math.random()*8
                //} else {
                //    new_grn = grn/9 * (Math.random()/10 + 1)
                //}
                //
                //if ((blu / 9) > 250) {
                //    new_blu = Math.random()*8
                //} else {
                //    new_blu = blu/9 * (Math.random()/10 + 1)
                //}
                //newImage.setRGB(i, j, [new_red, new_grn, new_blu])

                ///////////////////////////////////////////////////////////////////////////////
                if ((red > grn) && (red > blu)) {
                    if ((red /9) > 250 ) {
                        newImage.setRGB(i, j, [Math.random()*128, Math.random()*128+128, Math.random() * 255])
                    } else {
                        newImage.setRGB(i, j, [red / 8, Math.random() * 255 * .8, Math.random() * 255])
                    }
                } else if ((grn > red) && (grn > blu)) {
                    if ((grn /9) > 250) {
                        newImage.setRGB(i, j, [Math.random() * 255, Math.random()*128, Math.random()*128+128])
                    } else {
                        newImage.setRGB(i, j, [Math.random() * 255, grn / 8, Math.random() * 255 * .8])
                    }
                } else if ((blu > red) && (blu > grn)) {
                    if ((blu /9) > 250) {
                        newImage.setRGB(i, j, [Math.random()*128+128, Math.random() * 255, Math.random()*128])
                    } else {
                        newImage.setRGB(i, j, [Math.random() * 255 * .8, Math.random() * 255, blu / 8])
                    }
                } else {
                    newImage.setRGB(i,j, image.getRGB(i,j))
                }

                ///////////////////////////////////////////////////////////////////////////////
                //if ((red > grn) && (red > blu)) {
                //    if ((red /9) > 250 ) {
                //        newImage.setRGB(i, j, [red / 8, 255, Math.random() * 255])
                //    } else {
                //        newImage.setRGB(i, j, [red / 8, Math.random() * 255 * .8, Math.random() * 255])
                //    }
                //} else if ((grn > red) && (grn > blu)) {
                //    if ((grn /9) > 250) {
                //        newImage.setRGB(i, j, [Math.random() * 255, grn / 8, 255])
                //    } else {
                //        newImage.setRGB(i, j, [Math.random() * 255, grn / 8, Math.random() * 255 * .8])
                //    }
                //} else if ((blu > red) && (blu > grn)) {
                //    if ((blu /9) > 250) {
                //        newImage.setRGB(i, j, [255, Math.random() * 255, blu / 8])
                //    } else {
                //        newImage.setRGB(i, j, [Math.random() * 255 * .8, Math.random() * 255, blu / 8])
                //    }
                //} else {
                //    newImage.setRGB(i,j, image.getRGB(i,j))
                //}

                ///////////////////////////////////////////////////////////////////////////////
                //if ((red > grn) && (red > blu)) {
                //    newImage.setRGB(i,j,[red/8, Math.random()*255 *.8, Math.random()*255])
                //} else if ((grn > red) && (grn > blu)) {
                //    newImage.setRGB(i,j,[Math.random()*255, grn/8, Math.random()*255*.8])
                //} else if ((blu > red) && (blu > grn)) {
                //    newImage.setRGB(i,j,[Math.random()*255*.8, Math.random()*255, blu/8])
                //} else {
                //    newImage.setRGB(i,j, image.getRGB(i,j))
                //}
            }
        }
    }
})