<p align="center"><a href="https://arturke.github.io/Home_Projects/p5_gallery/index.htm"><img src="https://github.com/ArturKe/JS-Swipe-Gallery/blob/main/img/SwipeGalleryScreen.PNG"/></a></p>
# JS Swipe Gallery
- Настраиваемая галлерея изображений. Пролиствание на мобильном устройстве осуществляется свайпами влево/право, на десктопе кликом мыши на правой или левой стороне изображения.<a href="https://arturke.github.io/Home_Projects/p5_gallery/index.html">Gallery</a>
- Количество изображений неограничено. Если в галлерее меньше 5 изображений их количество отоюражается точками, если больше, то числом в формате: номер активного изображения/общее количество изображений.

# Как использовать
-При инициализации экземпляра TouchGallery класса передается: название класса обертки, массив со ссылками и оипсаниями изображений и размер блока галлереи (по умолчанию 300px на 300px).
-const glrImg =[{link:'img_link', desc:"Image Decription" }]
-const gallery = new TouchGallery('.wraper',glrImg,350,200);

