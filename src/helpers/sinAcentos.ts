export  const sinAcentos =(texto:string) =>{
    let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç',
      a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc',
      re = new RegExp('[' + de + ']', 'ug');    
    return texto.replace(
      re,
      match => a.charAt(de.indexOf(match))
    );
  }