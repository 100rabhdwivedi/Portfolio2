import React from 'react'
import * as THREE from 'three'
import { Canvas,useThree } from '@react-three/fiber'
import { OrbitControls ,useGLTF, useTexture} from '@react-three/drei'
const Dog = () => {

    const model = useGLTF("/models/dog.drc.glb")

    useThree(({camera,scene,gl})=>{
        camera.position.z = 0.55
        camera.position.y = -0.1
    })

    const textures = useTexture({
        normalMap:"/dog_normals.jpg"
    })

    textures.normalMap.flipY = false 
    
    model.scene.traverse((child)=>{
        if(child.name.includes("DOG")){
            child.material = new THREE.MeshMatcapMaterial({
                normalMap:textures.normalMap,
                color:0xff0000
            })
        }
    })
    return (
        <>
            <primitive object={model.scene} position={[0.22,-0.55,0]} rotation={[0,Math.PI/5,0]}/>
            <directionalLight intensity={10} position={[0,5,5]} color={0xffffff}/>
            <OrbitControls/>    
        </>
    )
}

export default Dog