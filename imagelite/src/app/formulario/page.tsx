    "use client"

    import {Button, Input, Template, RenderIf, useNotification} from "@/components"
    import Link from "next/link"
    import { Formik, useFormik } from "formik" // Importa o hook useFormik do Formik
    import { use, useState } from "react"
    import { useImageService } from "@/resouces/image/image.service"

    interface formProps{
        nome: string
        tags: string
        imagem: any
    }

    const formEscheme: formProps = {
        nome: "",
        tags: "",
        imagem: null
    }

    export default function FormularioPage(){

        const form = useFormik({
            initialValues: formEscheme,
            onSubmit: handleSubmit
        })

        const [imageFile, setImageFile] = useState<String>()
        const service = useImageService()
        const notify = useNotification()

        async function handleSubmit(dados: formProps){
            const formData = new FormData()
            formData.append("name", dados.nome)
            formData.append("tags", dados.tags)
            formData.append("file", dados.imagem)

            if(dados.imagem !== null && dados.nome.trim() !== ""){
                await service.salvar(formData)
                notify("Image uploaded successfully", "success")
            }else{
                notify("Error uploading image", "error")
            }

            form.resetForm()
            setImageFile("")
            
        }

        function onFileChange(event: React.ChangeEvent<HTMLInputElement>){ // Função para lidar com a mudança de arquivo
            if(event.target.files && event.target.files.length > 0){
                const file = event.target.files[0]
                form.setFieldValue("imagem", file) // Atualiza o valor do campo 'imagem' no Formik
                const imageURL = URL.createObjectURL(file) // Cria uma URL temporária para o arquivo selecionado
                setImageFile(imageURL) // Atualiza o estado com a URL da imagem para exibição
            }
        }

        return(
            <Template>
                <section className="flex flex-col items-center justify-center my-5">
                    <h5 className="mt-3 mb-10 text-4xl font-light tracking-tight text-gray-900">Nova imagem</h5>
                    <form onSubmit={form.handleSubmit} className="container w-3xl">
                        <div className="grid grid-cols-1 ">
                            <label className="block text-sm font-medium leading-6 text-gray-600">Nome: *</label>
                                <Input
                                    value={form.values.nome}
                                    id="nome"
                                    onChange={form.handleChange}
                                    placeholder="Digite o nome da imagem" />

                            <label className="block text-sm font-medium leading-6 text-gray-600 mt-5">Tags: *</label>
                                <Input
                                    id="tags"
                                    value={form.values.tags}
                                    onChange={form.handleChange}
                                    placeholder="Digite as tags" />

                            <label className="block text-sm font-medium leading-6 text-gray-600 mt-5">Imagem: *</label>

                            <div className="mt-2 m-auto flex w-50 h-50 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                                <div className="text-center flex flex-col justify-center items-center">
                            
                                <RenderIf condition={!imageFile}>
                                        <svg className="mx-auto h-20 w-20 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                    </RenderIf>
                                    <div className="mt-4 text-sm leading-6 text-gray-600">
                                        <label className="relative cursor-pointer rounded-md bg-white font-light text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <RenderIf condition={!imageFile}>
                                                <span>Upload a file</span>
                                            </RenderIf>
                                            <RenderIf condition={!!imageFile}>
                                                <img src={imageFile} width="300" className="rounded-md" />
                                            </RenderIf>
                                            <input
                                                onChange={onFileChange}
                                                type="file"
                                                className="sr-only" />
                                        </label>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="mt-6 mr-75 flex items-center justify-end gap-x-6">
                        <Button color="bg-blue-900" colorHover="hover:bg-blue-500" label="Save" type="submit"></Button>
                            <Link href="/galeria">
                                <Button color="bg-red-900" colorHover="hover:bg-red-500" type="button" label="Cancel"></Button>
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        )
    }