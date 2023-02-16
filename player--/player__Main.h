/***************************************************************
 * Name:      player__Main.h
 * Purpose:   Defines Application Frame
 * Author:     ()
 * Created:   2023-02-15
 * Copyright:  ()
 * License:
 **************************************************************/

#ifndef PLAYER__MAIN_H
#define PLAYER__MAIN_H

//(*Headers(player__Dialog)
#include <wx/button.h>
#include <wx/dialog.h>
#include <wx/sizer.h>
#include <wx/statline.h>
#include <wx/stattext.h>
//*)

class player__Dialog: public wxDialog
{
    public:

        player__Dialog(wxWindow* parent,wxWindowID id = -1);
        virtual ~player__Dialog();

    private:

        //(*Handlers(player__Dialog)
        void OnQuit(wxCommandEvent& event);
        void OnAbout(wxCommandEvent& event);
        //*)

        //(*Identifiers(player__Dialog)
        static const long ID_STATICTEXT1;
        static const long ID_BUTTON1;
        static const long ID_STATICLINE1;
        static const long ID_BUTTON2;
        //*)

        //(*Declarations(player__Dialog)
        wxBoxSizer* BoxSizer1;
        wxBoxSizer* BoxSizer2;
        wxButton* Button1;
        wxButton* Button2;
        wxStaticLine* StaticLine1;
        wxStaticText* StaticText1;
        //*)

        DECLARE_EVENT_TABLE()
};

#endif // PLAYER__MAIN_H
