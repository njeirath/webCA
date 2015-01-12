var Image = function(img) {
    this.img = img
}

Image.prototype.getHeight = function () {
    return this.img.height
}

Image.prototype.getWidth = function () {
    return this.img.width
}

Image.prototype.getIndex = function(x,y) {
    return (x*this.img.width + y)*4
}

Image.prototype.getRGB = function(x,y) {
    if ((x < 0) || (x >= this.getWidth()) || (y < 0) || (y > this.getHeight())) {
        return [0,0,0]
    }

    var i = this.getIndex(x,y)
    return [this.img.data[i], this.img.data[i+1], this.img.data[i+2]]
}

Image.prototype.setRGB = function(x,y,rgb) {
    var i = this.getIndex(x,y)
    this.img.data[i] = rgb[0]
    this.img.data[i+1] = rgb[1]
    this.img.data[i+2] = rgb[2]
    this.img.data[i+3] = 255
}

Image.prototype.getImage = function() {
    return this.img
}

Image.prototype.getLocal = function(x,y) {
    a = [[],[],[]]

    x_ind = 0

    for (var i = x-1; i <= x+1; i++) {
        y_ind = 0
        for (var j = y-1; j <= y+1; j++) {
            a[x_ind][y_ind] = this.getRGB(i,j)
            y_ind++
        }
        x_ind++
    }

    return a
}