
export default (Vue, ...params) => {

    params.map(le => Vue.use(le));


};

