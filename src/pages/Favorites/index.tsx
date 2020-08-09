import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { TeacherProps } from '../../components/TeacherItem'

import styles from './styles'

function Favorites() {
    const [favorites, setFavorites] = useState<TeacherProps[]>([])
    
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                setFavorites(favoritedTeachers)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })   

    return(
        <View
            style={styles.container}
        >
            <PageHeader title="Meus proffys favoritos"/>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map(teacher => (
                    <TeacherItem key={teacher.id} teacher={teacher} favorited />
                ))}                
            </ScrollView>
        </View>
    )
}

export default Favorites