<template>
	<q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
				<q-form @submit="onSubmit" autofocus>
					<q-card class="q-pa-md shadow-2 my_card" bordered>
						<q-card-section class="text-center">
							<div class="text-grey-9 text-h5 text-weight-bold">Authentication</div>
							<div class="text-grey-8">Decision Support System For New Employee Recruitment</div>
						</q-card-section>
						<q-card-section>
							<q-input dense outlined v-model="dataModel.username" :error="errors.username ? true : false" :error-message="errors.username" label="Username" />
							<q-input dense outlined class="q-mt-md" v-model="dataModel.password" :error="errors.password ? true : false" :error-message="errors.password" type="password" label="Password" />
						</q-card-section>
						<q-card-section>
							<q-btn type="submit" style="border-radius: 8px;" color="dark" rounded size="md" label="Sign In" no-caps class="full-width"></q-btn>
						</q-card-section>
						<q-card-section class="text-center q-pt-none">
							<div class="text-grey-8">Coded By <a href="https://www.facebook.com/muttaqien.s/" class="text-blue" style="text-decoration: none">Mutaqin Yusuf</a> &copy; 2023</div>
						</q-card-section>
					</q-card>
				</q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
	name: 'LoginPage',
	data() {
		return {
			dataModel: {
				username: null,
				password: null	
			},
			errors: []
		}
	},
	
	methods: {
		onSubmit() {
			const endpoint = 'auth/login'
			this.$api.post(endpoint, this.dataModel).then((response) => {
				if(response.status === 200 && response.data.data.token && response.data.msg) {
					localStorage.setItem('token', response.data.data.token)
					this.$router.push({ name: 'dashboard' })
				}
			}).catch((resE) => {
				if(resE.response.status === 400) {
					const e = resE.response.data.data
					console.log(e)
					e.username ? this.errors.username = e.username[0] : this.errors.username = null
					e.password ? this.errors.password = e.password[0] : this.errors.password = null
				}
			})
		}
	}
}
</script>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

</style>