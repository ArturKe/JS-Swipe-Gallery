<p align="center"><a href="https://arturke.github.io/Home_Projects/p5_gallery/index.html"><img src="https://github.com/ArturKe/JS-Swipe-Gallery/blob/main/img/SwipeGalleryScreen.PNG"/></a></p>

# JS Swipe Gallery
- <a href="https://arturke.github.io/Home_Projects/p5_gallery/index.html">Visit Gallery</a>
- Настраиваемая галлерея изображений. Пролиствание на мобильном устройстве осуществляется свайпами влево/право, на десктопе кликом мыши на правой или левой стороне изображения.

- Количество изображений неограничено. Если в галлерее меньше 5 изображений их количество отображается точками, если больше, то числом в формате: номер активного изображения/общее количество изображений.

# Как использовать
- При инициализации экземпляра класса TouchGallery передается: название класса обертки, массив со ссылками и оипсаниями изображений и размер изображения блока галлереи (по умолчанию 300px на 300px).
- const imgArray =[{link:'img_link', desc:"Image Decription" }]
- const gallery = new TouchGallery('.wraper',imgArray,350,200);

