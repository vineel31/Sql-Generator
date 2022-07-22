export default function generatePythonCode(structuredData,appName) {
    let result=''
    result += 'import pyspark	\n'
    result += 'from pyspark.sql import SparkSession	\n'

    result += 'if __name__ == "__main__":	\n'
    result += '\tspark=SparkSession.builder.appName("'+appName+'").enableHiveSupport().getOrCreate()	\n'
    for(let obj of structuredData){
        if(obj.type==="source node" && obj.name==="Csv"){
            result += '\tdf= spark.read.options(header='+obj.config.header.value+', inferSchema='+obj.config.inferSchema.value+').csv("'+obj.config.path.value+'")	\n'
            result += '\tdf.show()	\n'
        }
        if(obj.type==="destination node" && obj.name==="Json"){
            result += '\tdf.write.mode("Overwrite").json("'+obj.config.path.value+'")	\n'
        }
    }
    console.log("The resultant python code is:",result)

    return result;
}