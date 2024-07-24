import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'


const sass = gulpSass(dartSass)

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: '.'}) )

    done()
}

function watchFiles() {
    watch('src/scss/**/*.scss', css); // Vigila los archivos SCSS
    console.log('Vigilando cambios en archivos...');
}

export default series( css, watchFiles )