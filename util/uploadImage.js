/**
 * 上传图片
 * @param {formData} params
 */
import axios from 'axios';
export function uploadImage(params){
    //注意修改Content-Type文件类型，"multipart/form-data"表示表单中进行文件上传 
    return axios.post('uploadImg',params,{'Content-Type':'multipart/form-fata'})
}