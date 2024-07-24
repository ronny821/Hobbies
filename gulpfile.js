import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'


const sass = gulpSass(dartSass)

import terser from 'gulp-terser'


export function js(done) {
    console.log('Iniciando la tarea js...'); // Indicar que la tarea js ha comenzado
    src('src/js/app.js', { allowEmpty: true })
        .pipe(terser())
        .pipe(dest('build/js'))
        .on('end', () => console.log('Tarea js completada.')); // Confirmar que la tarea js ha terminado
    done();
}

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: '.'}) )

    done()
}

function watchFiles() {
    watch('src/js/**/*.js', js); // Vigila los archivos JS
    watch('src/scss/**/*.scss', css); // Vigila los archivos SCSS
    console.log('Vigilando cambios en archivos...');
}

export default series( js, css, watchFiles )