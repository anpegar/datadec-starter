import Vue from 'vue'
// import App from './App.vue'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './app.css';

// Components
import Navigation from './components/Navigation/Navigation'

new Vue({
	components: {
		Navigation
	},
	data() {
		return {
			isLoading: 'Aplicación cargada ...'
		};
	}
}).$mount('#app');

/* new Vue({
	el: '#app',
	render: h => h(App)
}); */